const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const yaml = require('js-yaml');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Usage: node headless-runner.js <agent-id> "<input-text>"
const agentId = process.argv[2];
const inputText = process.argv[3];

if (!agentId || !inputText) {
    console.error('Usage: node headless-runner.js <agent-id> "<input-text>"');
    process.exit(1);
}

// Load Agent Configuration
const agentFile = path.join(__dirname, '..', '.aios-core', 'development', 'agents', `${agentId}.md`);
const customAgentFile = path.join(__dirname, '..', `${agentId}.md`);
const customNameAgentFile = path.join(__dirname, '..', `${agentId}-agent.md`);

let finalAgentFile = null;
if (fs.existsSync(agentFile)) finalAgentFile = agentFile;
else if (fs.existsSync(customAgentFile)) finalAgentFile = customAgentFile;
else if (fs.existsSync(customNameAgentFile)) finalAgentFile = customNameAgentFile;

if (!finalAgentFile) {
    console.error(`Agent file not found for: ${agentId}`);
    process.exit(1);
}

// Extract System Prompt
function extractPrompt(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const yamlMatch = content.match(/```yaml([\s\S]*?)```/);
    let config = {};
    if (yamlMatch) {
        try {
            config = yaml.load(yamlMatch[1]);
        } catch (e) {
            console.error('YAML Log:', e.message);
        }
    }
    const instructions = content.replace(/```yaml[\s\S]*?```/, '').trim();

    return `
You are ${config.agent?.name || agentId}.
Role: ${config.persona?.role || 'Assistant'}
Style: ${config.persona?.style || 'Helpful'}

${instructions}

CORE PRINCIPLES:
${(config.persona?.core_principles || []).map(p => `- ${p}`).join('\n')}

Task: Process the following input and provide a text response suited for WhatsApp.
Input: "${inputText}"
  `.trim();
}

const systemPrompt = extractPrompt(finalAgentFile);

// Call LLM (Gemini)
async function callLLM(system, user) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Erro: GEMINI_API_KEY não configurada no .env");
        return "Erro de configuração: Chave Gemini ausente.";
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        // Using v1beta for the latest Gemini 3.0 models as they roll out
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            apiVersion: "v1beta"
        });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: system }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood." }],
                },
            ],
        });

        const result = await chat.sendMessage(user);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("LLM Error:", error);
        return `⚠️ Erro na IA: ${error.message || "Erro desconhecido"}`;
    }
}

// Execute
callLLM(systemPrompt, inputText).then(response => {
    console.log(response);
}).catch(err => {
    console.error(err);
});
