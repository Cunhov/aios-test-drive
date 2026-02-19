const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

// Este script roda no seu WINDOWS
const app = express();
const PORT = 3001; // Porta diferente do servidor local se rodar ambos

app.use(bodyParser.json());

// Endpoint que a VPS vai chamar via Túnel
app.post('/exec', (req, res) => {
    const { command, args } = req.body;

    console.log(`[VPS Command] Executando localmente: ${command} ${args || ''}`);

    // Segurança básica: Apenas comandos permitidos ou whitelist
    // Aqui Daniel pode restringir para apenas Python/FFmpeg
    const fullCommand = `${command} ${args || ''}`;

    exec(fullCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`[Erro Local] ${error.message}`);
            return res.status(500).json({ status: 'error', message: error.message });
        }
        res.json({ status: 'success', output: stdout.trim() });
    });
});

app.listen(PORT, () => {
    console.log(`📡 Desktop Bridge ATIVO na porta ${PORT}`);
    console.log(`👉 Agora ligue o túnel Cloudflare para esta porta:`);
    console.log(`   cloudflared tunnel --url http://localhost:${PORT}`);
});
