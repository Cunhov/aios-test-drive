# Plano de Deploy VPS: AIOS Bridge via Easypanel

## 🚀 Como vai funcionar
1.  **Repositório**: Você vai criar um repositório privado no GitHub.
2.  **Sincronização**: Eu vou preparar os arquivos locais para você subir.
3.  **Easypanel**: Você criará um "App" vinculando seu GitHub. O Easypanel detectará o `Dockerfile` e subirá o serviço automaticamente.

## Arquivos Necessários no Repositório
*   `.aios-core/` (Coração do sistema: agentes, regras).
*   `scripts/server.js` (O receptor do Webhook).
*   `scripts/headless-runner.js` (O cérebro Gemini).
*   `Dockerfile` (Instruções para o Easypanel).
*   `package.json` (Dependências).

## Configuração no Easypanel
Na tela do App no Easypanel, configure as **Variáveis de Ambiente (Environment Variables)**:
```env
GEMINI_API_KEY=AIzaSyBMugcz0Gr6BdVSaxqccZyXE_YEj6HptIA
EVOLUTION_API_URL=https://sua-api.com
EVOLUTION_API_KEY=sua-chave
```

## Integração Evolution API
No painel da Evolution, aponte o Webhook para a URL que o Easypanel gerar (ex: `https://aios-bridge.seudominio.com/webhook`).

## Vantagens
*   **Custo Zero**: O Easypanel já está na sua VPS. O Gemini Flash é gratuito no tier inicial.
*   **Stabilidade**: O sistema não depende do seu PC Windows estar ligado.
*   **Escalabilidade**: Se precisar de mais RAM, o Easypanel gerencia.
