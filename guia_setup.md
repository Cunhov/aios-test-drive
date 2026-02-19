# 🚀 Guia de Setup: AIOS Secretária Digital (Edição Gemini)

Os scripts foram atualizados para usar **Gemini Flash**.

## 1. Instalar Dependências
No terminal dentro da pasta `aios-test-drive`, execute (adicionamos a lib do Google):

```bash
npm install express body-parser axios form-data dotenv fluent-ffmpeg js-yaml @google/generative-ai
```

## 2. Configurar o arquivo .env
Crie um arquivo chamado `.env` na pasta `aios-test-drive` com o seguinte conteúdo:

```env
# Configurações da API de IA (Gemini)
GEMINI_API_KEY=AIzaSyBMugcz0Gr6BdVSaxqccZyXE_YEj6HptIA

# Configurações da Evolution API (VPS)
# Coloque a URL da sua API e a chave global/instância
EVOLUTION_API_URL=https://sua-evolution-api.com
EVOLUTION_API_KEY=sua-chave-evolution
```

## 3. Instalar Cloudflare Tunnel (Windows)
1.  Baixe o `cloudflared-windows-amd64.exe` do [GitHub do Cloudflare](https://github.com/cloudflare/cloudflared/releases).
2.  Renomeie para `cloudflared.exe`.
3.  Abra o terminal e rode:
    ```bash
    .\cloudflared.exe tunnel --url http://localhost:3000
    ```
4.  Copie o link gerado (ex: `https://rapid-horse-42.trycloudflare.com`).

## 4. Configurar a Evolution API (Na VPS)
1.  Acesse sua Evolution API.
2.  Configure o Webhook para: `https://[SEU-LINK-CLOUDFLARE]/webhook`
3.  Ative o evento `MESSAGES_UPSERT`.

## 5. Rodar o Servidor
Com o túnel ligado, abra **outro terminal** e rode:

```bash
node scripts/server.js
```

---

## 🤖 Teste Final
Envie um áudio ou texto para seu WhatsApp conectado:
*"Quero um resumo da minha agenda."*

O servidor local vai receber o webhook, processar com o Gemini (Flash) e responder!
