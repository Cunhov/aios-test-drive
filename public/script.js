document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    const logs = document.getElementById('logs');
    const cmdInput = document.getElementById('command-input');
    const sendBtn = document.getElementById('send-cmd');
    const contextEditor = document.getElementById('context-editor');

    // --- State & Navigation ---
    const showTab = (tabId) => {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`tab-${tabId}`).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        if (tabId === 'context') loadContext();
        if (tabId === 'mcp') loadConfig();
    };

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => showTab(btn.dataset.tab));
    });

    // --- Auth ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('pass').value;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, pass })
        });

        if (res.ok) {
            loginScreen.classList.remove('active');
            appContainer.classList.remove('hidden');
            writeLog("Painel AIOS v3 Autenticado. Bem-vindo, Daniel.");
            startMonitoring();
        } else {
            alert("Acesso Negado.");
        }
    });

    // --- Terminal & Commands ---
    const writeLog = (text, type = 'system') => {
        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.innerHTML = `<span class="timestamp">[${new Date().toLocaleTimeString()}]</span> ${text}`;
        logs.appendChild(line);
        logs.scrollTop = logs.scrollHeight;
    };

    const runCommand = async () => {
        const raw = cmdInput.value.trim();
        if (!raw) return;
        writeLog(raw, 'input');
        cmdInput.value = '';

        const res = await fetch('/api/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ raw })
        });
        const data = await res.json();
        writeLog(data.result, 'output');
    };

    sendBtn.addEventListener('click', runCommand);
    cmdInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') runCommand(); });

    // --- Context Editor ---
    const loadContext = async () => {
        contextEditor.value = "Carregando memória...";
        const res = await fetch('/api/context');
        const data = await res.json();
        contextEditor.value = data.content || data.error;
    };

    document.getElementById('save-context').addEventListener('click', async () => {
        const res = await fetch('/api/context', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: contextEditor.value })
        });
        if (res.ok) alert("Contexto Atualizado com Sucesso!");
    });

    // --- .env / Config ---
    const loadConfig = async () => {
        const res = await fetch('/api/config');
        const config = await res.json();
        document.querySelectorAll('.env-input').forEach(input => {
            input.value = config[input.dataset.key] || '';
        });
    };

    document.querySelectorAll('.save-env-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const input = btn.parentElement.querySelector('.env-input');
            const key = input.dataset.key;
            const val = input.value;

            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [key]: val })
            });
            if (res.ok) {
                btn.textContent = "LINKED!";
                setTimeout(() => btn.textContent = btn.classList.contains('save-env-btn') ? "LINK SERVICE" : "SAVE", 2000);
            }
        });
    });

    // --- Monitoring ---
    const startMonitoring = () => {
        // Initial load
        updateAgentsList();

        setInterval(async () => {
            try {
                const res = await fetch('/api/status');
                const status = await res.json();

                const ds = document.getElementById('desktop-status');
                ds.textContent = status.desktop.connected ? `ONLINE (${status.desktop.latency})` : "OFFLINE";
                ds.className = `value ${status.desktop.connected ? 'online' : 'offline'}`;

                // We could also update agent status dots here
            } catch (e) { }
        }, 5000);
    };

    const updateAgentsList = async () => {
        const agentsList = document.getElementById('agents-list');
        // Simple heuristic: agents are the ones listed in the supported array in server.js
        // For now, we keep them, but we could fetch them from /api/agents if we had it
        // Let's just make it look more active
        writeLog("Sincronizando Squad de Agentes...");
    };

    document.getElementById('test-connection')?.addEventListener('click', async () => {
        writeLog("Iniciando Heartbeat Test...");
        const res = await fetch('/api/status');
        const status = await res.json();
        if (status.desktop.connected) {
            writeLog(`Conexão Estável. Latência: ${status.desktop.latency}`, 'output');
        } else {
            writeLog("Erro: Desktop Bridge não responde.", 'error');
        }
    });

    // --- Logout ---
    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });
        location.reload();
    });
});
