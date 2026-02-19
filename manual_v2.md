# 🚀 AIOS Command Center v2: O Próximo Nível

Daniel, sua Dashboard v2 está pronta! Agora você tem um centro de comando visual para gerenciar seus agentes, sua memória de negócio e até seu PC Windows.

## 1. O que mudou?
*   **Abas de Gestão**: Navegue entre o Terminal de logs, Configuração de MCP e Link com o Desktop.
*   **Editor de Contexto**: Edite o `contexto_negocio.md` direto na Dashboard e salve na hora.
*   **Login Seguro**: Proteção total via e-mail e senha no `.env`.

## 2. Como ligar o Desktop Link (No seu Windows)
Para que a VPS consiga mandar ordens para o seu PC (como renderizar vídeos):

1.  Abra um terminal no Windows e rode:
    ```bash
    node scripts/desktop-bridge.js
    ```
2.  Ligue o túnel Cloudflare para a porta 3001 (que o bridge usa):
    ```bash
    .\cloudflared.exe tunnel --url http://localhost:3001
    ```
3.  Copie o link gerado e guarde-o (vamos usá-lo na Dashboard em breve).

## 3. Push de Atualização
Como eu já fiz os commits locais para você, basta rodar este comando na pasta `aios-test-drive`:

```bash
git push origin main
```

O Easypanel vai atualizar o sistema automaticamente.

---

### Credenciais da Dashboard (Configure no Easypanel):
Adicione estas variáveis no campo **Environment** do Easypanel:
*   `DASHBOARD_USER`: daniel@seu-dominio.com
*   `DASHBOARD_PASS`: sua-senha-foda
*   `SESSION_SECRET`: um-texto-qualquer-seguro

Voilá! Ao acessar a URL do app, você verá a nova interface **AIOS POWER**. 🍿💪
