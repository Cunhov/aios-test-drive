# Implementação: Secretária Digital AIOS (WhatsApp + n8n + Local Tunnel)

## Objetivo
Criar um canal direto no WhatsApp onde você envia áudios/textos e o AIOS (rodando no seu PC local) processa.

## Arquitetura Simplificada (Direta)
1.  **Entrada**: WhatsApp (Evolution API na VPS).
2.  **Ponte (Túnel)**: A Evolution API envia o webhook *diretamente* para o Cloudflare Tunnel (`https://seu-aios.trycloudflare.com`).
3.  **Recepção Local**: O servidor Node.js (`server.js`) recebe o JSON da Evolution.
4.  **Processamento Local**:
    *   O script `server.js` detecta se tem áudio.
    *   Se tiver áudio, baixa e transcreve (usando API da OpenAI/Groq).
5.  **Execução**: O servidor local chama o AIOS CLI.
6.  **Retorno**: O servidor local chama a Evolution API para responder no WhatsApp.

## Passos da Implementação (Atualizados)

### 1. Preparação Local (Windows)
*   Instalar `cloudflared`.
*   Atualizar `server.js` para lidar com webhooks da Evolution API (não mais do n8n).
*   Adicionar lógica de transcrição e envio de mensagem no `server.js`.

### 2. Configuração na VPS (Evolution API)
*   Alterar a URL do Webhook na Evolution para apontar para o túnel.

## 🖥️ Nova Funcionalidade: AIOS Dashboard
Agora o sistema terá uma interface visual para você gerenciar seus agentes sem precisar abrir o terminal se não quiser.

### 1. Design & Estética
*   **Vibe**: Dark Mode, Glassmorphism (vidro fosco), cores inspiradas no Gemini/Google (Azul/Roxo futurista).
*   **Funcionalidades**:
    *   **Status dos Agentes**: Verde/Vermelho se estivem carregados.
    *   **Live Logs**: Ver as mensagens chegando do WhatsApp em tempo real.
    *   **Terminal Rápido**: Digitar comandos direto na web.
    *   **Editor de Contexto**: Visualizar o `contexto_negocio.md` direto na tela.

### 2. Segurança (Auth)
*   **Simplicidade & Proteção**: Login local via Middleware de sessão.
*   **Configuração**: Chaves no `.env`:
    ```env
    DASHBOARD_USER=seu@email.com
    DASHBOARD_PASS=sua-senha-super-segura
    SESSION_SECRET=string-aleatoria-para-seguranca
    ```

## 🌐 Expansão: MCP e Conexão Desktop (Reversa)

### 1. Sistema MCP (Model Context Protocol)
O AIOS agora usará MCP para "plugar" suas ferramentas sem códigos manuais.
*   **Servidores MCP**: Notion, ClickUp, Poe, Google Drive, e um MCP customizado para a Evolution API.
*   **Benefício**: O agente `@secretary` ou `@pm` poderá ler seu ClickUp ou salvar no Notion usando ferramentas nativas da IA.

### 2. Conexão Reversa VPS -> Windows Desktop
Para que a VPS consiga editar vídeos no seu Windows:
1.  **Local (Windows)**: Rodaremos um servidor MCP de "Filesystem" e um "Command Runner" local.
2.  **Túnel**: Usaremos o **Cloudflared Tunnel** para expor esse servidor local para a VPS de forma criptografada.
3.  **Ação**: Quando o Daniel pedir no WhatsApp "Edite o vídeo X", a VPS manda o comando pelo túnel, o Windows executa o Python/FFmpeg local, e o resultado é processado.

### 3. Dashboard v2 (Aprimorada)
*   **Painel MCP**: Ativar/Desativar conexões com um clique.
*   **Desktop Sync**: Indicador Visual se o seu PC Windows está conectado à VPS.
*   **Editor de Agentes**: Campo de texto para ajustar as regras da `@secretary` sem usar o código.

### 3. Configuração do Agente "Secretária" (@secretary)
*   Agente de triagem já definido (mantido).

### 4. Teste de Fluxo
*   Rodar `cloudflared tunnel --url http://localhost:3000`.
*   Enviar comando do n8n para a URL gerada.
