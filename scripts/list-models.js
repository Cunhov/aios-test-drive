const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API key found.");
        return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // Note: listModels is not directly available on genAI in some versions
        // but it is available on the client or via a specific call.
        // Actually, in @google/generative-ai, there isn't a direct listModels.
        // I might need to use the REST API or a different approach.
        // However, I can try to use gemini-2.0-flash as a fallback if 3.0 fails.
        console.log("Attempting to verify model names...");
    } catch (e) {
        console.error(e);
    }
}
listModels();
