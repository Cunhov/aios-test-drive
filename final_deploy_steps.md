# 🏁 Instruções Finais: Deploy no Easypanel

Daniel, já preparei todos os arquivos na sua pasta local `aios-test-drive`. Agora é só seguir este checklist final:

## 1. Subir para o GitHub (Privado)
Abra o terminal na pasta `aios-test-drive` e rode estes comandos:

```bash
git init
git add .
git commit -m "feat: initial aios bridge setup"
git branch -M main
# Crie um repo privado no GitHub e cole o link abaixo
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

## 2. Configurar no Easypanel
1.  No Easypanel, clique em **"Create Project"**.
2.  Clique em **"Add Service"** -> **"App"**.
3.  Em **Source**, escolha **GitHub** e selecione o repositório que você acabou de criar.
4.  O Easypanel vai detectar o `Dockerfile` automaticamente.
5.  Vá na aba **Environment** e adicione as 3 chaves que definimos:
    *   `GEMINI_API_KEY`: Aquela que você me passou.
    *   `EVOLUTION_API_URL`: O domínio da sua API na Hostinger.
    *   `EVOLUTION_API_KEY`: A chave da instância.
    *   `DASHBOARD_USER`: Seu e-mail para acesso (ex: daniel@dominio.com).
    *   `DASHBOARD_PASS`: Uma senha forte escolhida por você.
6.  Clique em **Deploy**.

## 3. Ligar o Webhook
Uma vez que o Easypanel te der a URL (ex: `https://aios.seudominio.com`), vá no seu painel da Evolution e configure o webhook:
*   **URL**: `https://aios.seudominio.com/webhook`
*   **Eventos**: `MESSAGES_UPSERT`.

## 🖥️ Acessando sua Dashboard
Após o deploy, acesse a URL principal do App: `https://aios.seudominio.com`.
Use o e-mail e senha que você configurou no Passo 2.5 para entrar e ver os logs em tempo real!

---

🚀 **Pronto!** Assim que você terminar, seu "império" estará sob comando de voz. Qualquer áudio que você mandar para o número da instância será processado pelo Gemini seguindo as regras da sua nova Secretária Digital.
