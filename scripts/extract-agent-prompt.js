const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Usage: node extract-agent-prompt.js <agent-file-path>
const agentFile = process.argv[2];

if (!agentFile) {
    console.error('Usage: node extract-agent-prompt.js <agent-file-path>');
    process.exit(1);
}

try {
    const content = fs.readFileSync(agentFile, 'utf8');

    // Extract YAML block
    const yamlMatch = content.match(/```yaml([\s\S]*?)```/);
    let config = {};

    if (yamlMatch) {
        try {
            config = yaml.load(yamlMatch[1]);
        } catch (e) {
            console.error('Error parsing YAML:', e.message);
        }
    }

    // Extract instructions (everything after YAML or specific sections)
    // For simplicity, we use the whole file as context but clean up the YAML block wrapper
    const instructions = content.replace(/```yaml[\s\S]*?```/, '').trim();

    const systemPrompt = `
You are ${config.agent?.name || 'an AI Assistant'} (${config.agent?.title || ''}).
Your Role: ${config.persona?.role || 'Assistant'}
Your Style: ${config.persona?.style || 'Helpful'}

${instructions}

COMMANDS AVAILABLE:
${(config.commands || []).map(c => `- ${c.name}: ${c.description}`).join('\n')}

CORE PRINCIPLES:
${(config.persona?.core_principles || []).map(p => `- ${p}`).join('\n')}
  `.trim();

    // Output as JSON for n8n
    console.log(JSON.stringify({
        role: "system",
        content: systemPrompt
    }));

} catch (error) {
    console.error('Error reading file:', error.message);
    process.exit(1);
}
