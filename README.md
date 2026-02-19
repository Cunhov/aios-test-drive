# AIOS | THE GRID - Central de Comando Digital 🚀

Este repositório contém a sua **Secretária Digital** e o **Dashboard de Operações** integrados ao ecossistema Synkra AIOS.

## 🛠️ O que foi configurado?

1.  **Secretária Digital (WhatsApp)**: Integrada via **Evolution API**.
2.  **Dashboard (The Grid)**: Painel visual para monitorar agentes, ClickUp e logs em tempo real.
3.  **Reverse Bridge**: Capacidade da VPS de comandar este PC local (Windows) para tarefas pesadas (edição de vídeo).

## 🚀 Como Iniciar

### 1. Configuração de Ambiente
Crie um arquivo `.env` na raiz desta pasta baseando-se no modelo abaixo:

```env
# AI Provider
GEMINI_API_KEY=sua_chave_aqui

# Evolution API (WhatsApp)
EVOLUTION_API_URL=https://sua-vps.com/evolution
EVOLUTION_API_KEY=sua-chave-api-aqui
EVOLUTION_INSTANCE=aios

# Integrations
NOTION_TOKEN=secret_xxx
CLICKUP_TOKEN=pk_xxx

# Dashboard Auth
DASHBOARD_USER=daniel@aios.com
DASHBOARD_PASS=sua-pass-segura
SESSION_SECRET=aios-grid-secret-2026

# Desktop Link (Túnel Cloudflare)
DESKTOP_BRIDGE_URL=https://seu-pc.trycloudflare.com
```

### 2. Instalação de Dependências
```bash
npm install
```

### 3. Rodar o Servidor
```bash
node scripts/server.js
```
O Dashboard estará disponível em `http://localhost:3000`.

## 🤖 Comandos Principais (WhatsApp)

- **@secretary [texto/áudio]**: Triagem automática da secretária.
- **@pm [comando]**: Gestão de tarefas no ClickUp.
- **@content_director [ideia]**: Planejamento de roteiros e vídeos.
- **@video_editor [comando]**: Edição local via script.

## 🧪 Teste de Integração
Para validar se o seu servidor está recebendo as mensagens corretamente sem precisar do WhatsApp, use:
```bash
node scripts/test-webhook.js
```

---
**Daniel Cunha** | *AI-Orchestrated System Custom Suite*
