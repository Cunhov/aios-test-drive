# Walkthrough: Primeiros Passos no Synkra AIOS

Pruisamos de apenas alguns passos para deixar tudo pronto para o seu primeiro teste!

## 🚀 Setup Realizado

Criei um ambiente de testes isolado chamado `aios-test-drive` para você experimentar sem riscos.

### Comandos Executados
1.  **Criação de Pasta**: `mkdir aios-test-drive`
2.  **Inicialização Manual**: Copiei os arquivos core (`.aios-core`, `AGENTS.md`) para garantir que você tenha a estrutura correta.
3.  **Validação**: Executei o `aios doctor` para confirmar que tudo está funcionando.

### Prova de Saúde do Sistema
```text
🏥 AIOS System Diagnostics
✔ Node.js version: v24.13.1
✔ npm version: 10.9.0
✔ Synkra AIOS: v4.2.4
✅ All checks passed! Your installation is healthy.
```

---

## 🛠️ Como usar agora?

Acesse a pasta de teste e comece a interagir:

1.  **Entre na pasta**:
    ```bash
    cd aios-test-drive
    ```

2.  **Interaja com os Agentes**:
    Abra o seu terminal (ou IDE como Cursor/VS Code) e tente os seguintes comandos (prefixados com `@` para os agentes):
    *   `@aios-master *help`: Veja o que o mestre do sistema pode fazer.
    *   `@analyst *gather-requirements`: Simule um briefing de um novo projeto.
    *   `@architect *assess-complexity`: Peça uma análise técnica de um problema.

---

## 💡 Próximos Passos
Agora que o ambiente está "saudável", você pode começar a usar o fluxo **ADE (Autonomous Development Engine)** para criar código automaticamente. 

> [!TIP]
> Tente pedir ao `@pm` para escrever uma especificação de uma feature simples!
