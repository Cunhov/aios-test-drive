const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV_PATH = path.join(__dirname, '..', '.env');
const CONTEXT_PATH = path.join(__dirname, '..', 'contexto_negocio.md');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'aios-grid-secret-2026',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// --- Middleware: Auth ---
const authRequired = (req, res, next) => {
    if (req.session.authenticated) return next();
    res.status(401).json({ error: 'Unauthorized' });
};

// --- API: Auth ---
app.post('/api/login', (req, res) => {
    const { email, pass } = req.body;
    console.log(`[Dashboard] Tentativa de login: ${email}`);

    if (email === process.env.DASHBOARD_USER && pass === process.env.DASHBOARD_PASS) {
        req.session.authenticated = true;
        console.log(`[Dashboard] Login bem-sucedido para: ${email}`);
        res.json({ success: true });
    } else {
        console.warn(`[Dashboard] Falha no login para: ${email}. Esperado: ${process.env.DASHBOARD_USER}`);
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// --- API: Config (.env Management) ---
app.get('/api/config', authRequired, (req, res) => {
    const config = {};
    const allowedKeys = [
        'GEMINI_API_KEY', 'NOTION_TOKEN', 'CLICKUP_TOKEN',
        'EVOLUTION_API_URL', 'EVOLUTION_API_KEY', 'DASHBOARD_USER'
    ];

    allowedKeys.forEach(key => {
        config[key] = process.env[key] || '';
    });
    res.json(config);
});

app.post('/api/config', authRequired, (req, res) => {
    const updates = req.body;
    let envContent = '';

    if (fs.existsSync(ENV_PATH)) {
        envContent = fs.readFileSync(ENV_PATH, 'utf8');
    }

    Object.keys(updates).forEach(key => {
        const regex = new RegExp(`^${key}=.*`, 'm');
        const newLine = `${key}=${updates[key]}`;
        if (envContent.match(regex)) {
            envContent = envContent.replace(regex, newLine);
        } else {
            envContent += `\n${newLine}`;
        }
        process.env[key] = updates[key]; // Update runtime
    });

    fs.writeFileSync(ENV_PATH, envContent.trim() + '\n', 'utf8');
    res.json({ success: true });
});

// --- API: Status & Diagnostics ---
app.get('/api/status', authRequired, async (req, res) => {
    const status = {
        vps: { cpu: 'Normal', ram: '24%' },
        desktop: { connected: false, latency: 'N/A' },
        agents: {
            secretary: 'Online',
            content_director: 'Online',
            video_editor: 'Standby',
            project_manager: 'Online'
        }
    };

    // Try to ping Desktop Bridge if URL exists
    if (process.env.DESKTOP_BRIDGE_URL) {
        try {
            const start = Date.now();
            await axios.get(`${process.env.DESKTOP_BRIDGE_URL}/ping`, { timeout: 2000 });
            status.desktop.connected = true;
            status.desktop.latency = `${Date.now() - start}ms`;
        } catch (e) {
            status.desktop.connected = false;
        }
    }

    res.json(status);
});

// --- API: Context ---
app.get('/api/context', authRequired, (req, res) => {
    if (fs.existsSync(CONTEXT_PATH)) {
        res.json({ content: fs.readFileSync(CONTEXT_PATH, 'utf8') });
    } else res.status(404).json({ error: 'Contexto não encontrado' });
});

app.post('/api/context', authRequired, (req, res) => {
    fs.writeFileSync(CONTEXT_PATH, req.body.content, 'utf8');
    res.json({ success: true });
});

// --- API: Commands ---
app.post('/api/command', authRequired, (req, res) => {
    const { raw } = req.body;
    const match = raw.match(/@([a-zA-Z0-9_]+)\s+(.*)/);
    if (!match) return res.json({ result: "Use: @agente comando" });

    const agent = match[1];
    const input = match[2];
    const supported = ['secretary', 'content_director', 'video_editor', 'project_manager', 'sales_force'];

    if (!supported.includes(agent)) {
        return res.json({ result: `Agente @${agent} não suportado.` });
    }

    exec(`node scripts/headless-runner.js ${agent} "${input.replace(/"/g, '\\"')}"`, (err, stdout) => {
        res.json({ result: err ? `Erro: ${err.message}` : stdout.trim() });
    });
});

// --- Helper: Send WhatsApp Message ---
async function sendWhatsApp(remoteJid, text) {
    const url = `${process.env.EVOLUTION_API_URL}/message/sendText/${process.env.EVOLUTION_INSTANCE || 'aios'}`;
    const headers = {
        'apikey': process.env.EVOLUTION_API_KEY,
        'Content-Type': 'application/json'
    };
    try {
        await axios.post(url, {
            number: remoteJid,
            text: text,
            delay: 1200,
            linkPreview: true
        }, { headers });
        console.log(`[WhatsApp] Resposta enviada para ${remoteJid}`);
    } catch (e) {
        console.error(`[WhatsApp] Erro ao enviar mensagem: ${e.message}`);
    }
}

// --- Webhook: Evolution API ---
app.post('/webhook', async (req, res) => {
    const data = req.body;

    // We only care about messages upsert
    if (data.event !== 'messages.upsert') return res.sendStatus(200);

    const message = data.data;
    const remoteJid = message.key.remoteJid;
    const fromMe = message.key.fromMe;
    const pushName = message.pushName || 'Usuário';

    if (fromMe) return res.sendStatus(200); // Don't reply to self

    let inputText = '';
    const messageType = message.messageType;

    if (messageType === 'conversation') {
        inputText = message.message.conversation;
    } else if (messageType === 'extendedTextMessage') {
        inputText = message.message.extendedTextMessage.text;
    } else if (messageType === 'audioMessage') {
        // Handle Audio - Simplified for now: Log and notify
        // In a real scenario, download from Evolution API and transcribe
        inputText = "[Transcrição de Áudio Placeholder: O usuário enviou um áudio]";
        console.log(`[WhatsApp] Áudio recebido de ${pushName}. Transcrição pendente.`);
    }

    if (!inputText) return res.sendStatus(200);

    console.log(`[WhatsApp] Recebido de ${pushName}: ${inputText}`);

    // Route to Agent (Default to @secretary if no handle)
    let agentHandle = 'secretary';
    let cleanInput = inputText;

    const match = inputText.match(/^@([a-zA-Z0-9_]+)\s+(.*)/);
    if (match) {
        agentHandle = match[1];
        cleanInput = match[2];
    }

    // Execute via Headless Runner
    exec(`node scripts/headless-runner.js ${agentHandle} "${cleanInput.replace(/"/g, '\\"')}"`, async (err, stdout) => {
        const response = err ? `⚠️ Erro: ${err.message}` : stdout.trim();
        await sendWhatsApp(remoteJid, response);
    });

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 AIOS THE GRID v3 on port ${PORT}`));
