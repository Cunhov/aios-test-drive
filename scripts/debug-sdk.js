const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
    console.log("Key:", process.env.GEMINI_API_KEY ? "Found" : "Missing");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-3-flash-preview",
        apiVersion: "v1beta"
    });

    try {
        console.log("Model name in object:", model.model);
        const result = await model.generateContent("Hello");
        console.log("Response:", await result.response.text());
    } catch (e) {
        console.error("Error URL/Message:", e.message);
        if (e.response) {
            console.error("Full Response Error:", e.response);
        }
    }
}
test();
