const axios = require('axios');

const payload = {
    "event": "messages.upsert",
    "instance": "aios",
    "data": {
        "key": {
            "remoteJid": "123456789@s.whatsapp.net",
            "fromMe": false,
            "id": "ABC12345"
        },
        "pushName": "Daniel Teste",
        "messageType": "conversation",
        "message": {
            "conversation": "Olá @secretary, como está o status da equipe no ClickUp?"
        },
        "messageTimestamp": 1700000000
    }
};

async function testWebhook() {
    console.log("🚀 Enviando payload de teste para http://localhost:3000/webhook...");
    try {
        const res = await axios.post('http://localhost:3000/webhook', payload);
        console.log(`✅ Status: ${res.status} (${res.statusText})`);
        console.log("Verifique o terminal do server.js para ver a execução do comando.");
    } catch (e) {
        console.error(`❌ Erro: ${e.message}`);
        console.log("Certifique-se de que o servidor está rodando (node aios-test-drive/scripts/server.js)");
    }
}

testWebhook();
