# 🏗️ Guia de Arquitetura: Como você controla o Império

Daniel, essa é a parte onde muitos se perdem, mas é simples quando você entende o fluxo de "Mestre vs. Escravo".

## 1. O Triângulo de Poder
Seu sistema funciona em 3 camadas:

1.  **Sua Máquina Local (PC Windows)**: É o seu **Escritório de Engenharia**. É aqui que eu (AntiGravity), o Claude Code ou o Gemini CLI moramos. Você faz as mudanças aqui porque é mais rápido e você tem todas as ferramentas de IA na mão.
2.  **GitHub (O Cofre)**: É a **Ponte**. Tudo o que você termina de "inventar" no PC, você envia para cá (`git push`).
3.  **VPS / Easypanel (A Fábrica)**: É o ambiente de **Produção 24/7**. O Easypanel fica vigiando o GitHub. Assim que ele vê um código novo, ele reconstrói o container e aplica a mudança na hora.

## 2. "Posso usar Claude Code ou Gemini CLI na VPS?"
**Resposta curta: Você pode, mas não deve.**

*   **Por que não?**: A VPS roda o projeto dentro do **Docker**. Mexer no código lá dentro é como tentar consertar o motor de um carro enquanto ele corre na estrada. Se a VPS cair ou o container reiniciar, você perde o que fez lá dentro.
*   **O jeito certo**: Use o Claude Code ou a mim (AntiGravity) **aqui no seu PC**. Nós modificamos o código local, você testa, dá um `git push` e a VPS se atualiza sozinha. Isso garante que seu código esteja sempre salvo no GitHub.

## 3. Como adicionar novos Agentes ou Regras?
1.  **No seu PC**: Crie um novo arquivo `.md` na pasta `.aios-core/agents/` ou me peça para criar.
2.  **Teste Local**: Se quiser, rode o `node scripts/headless-runner.js` no seu terminal para ver se ele responde bem.
3.  **Envie**: `git add .`, `git commit -m "novo agente"`, `git push`.
4.  **Pronto**: Em 30 segundos, a sua Dashboard na VPS e seu WhatsApp já saberão usar o novo agente.

## 4. Onde a Dashboard entra?
A Dashboard que eu criei na VPS é para **Operação**, não para programação:
*   Ver logs (o que a IA está fazendo agora).
*   Mandar comandos rápidos via web.
*   Ajustar o `contexto_negocio.md` (que eu fiz um editor especial pra você).

---

### Resumo do Fluxo de Trabalho:
> **Daniel + AntiGravity (PC)** -> `git push` -> **GitHub** -> **Easypanel (VPS)** -> **WhatsApp / Dashboard**

Ficou mais claro agora? Você é o arquiteto aqui no Windows, e a VPS é apenas o operário que mantém tudo ligado dia e noite! 🍿🔥
