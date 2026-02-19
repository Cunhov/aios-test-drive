# 🤖 Plano Mestre de Agentes: O Império AIOS

Baseado no seu `contexto_negocio.md`, desenhei a estrutura de **Squads de Agentes** que vão operar seu negócio. Cada agente terá ferramentas específicas (MCP) e permissões.

## 1. Squad de Operações & Gestão (Marinho Jr & Equipe)

### 👮‍♂️ `@project_manager` (O Gerente)
*   **Missão**: Garantir que ninguém da equipe (4 pessoas) fique sem tarefas e cobrar prazos.
*   **MCPs Necessários**:
    *   `clickup-mcp`: Para ler status, criar tarefas e mover cards.
    *   `notion-mcp`: Para ler as documentações e briefings do projeto.
*   **Ações Autônomas**:
    *   Ler o ClickUp toda manhã.
    *   Gerar um relatório no seu WhatsApp: *"Bom dia Daniel. O Rodrigo tem 2 sites pendentes. O Marinho não gravou o vídeo X."*

### 👔 `@sales_force` (BioLift & Infoprodutos)
*   **Missão**: Monitorar vendas e suporte básico.
*   **MCPs Necessários**:
    *   `evolution-api-mcp`: Para disparar mensagens de cobrança ou recuperação de vendas.
    *   `database-mcp`: Conexão com seu banco de dados de alunos (MySQL/Supabase).
*   **Ações Autônomas**:
    *   Detectar boleto não pago -> Enviar mensagem de recuperação.
    *   Responder dúvidas frequentes sobre o curso BioLift baseadas no PDF do curso (RAG).

## 2. Squad de Conteúdo (YouTube/Insta)

### 🎬 `@content_director` (O Editor Chefe)
*   **Missão**: Gerenciar sua esteira de vídeos infinita.
*   **MCPs Necessários**:
    *   `youtube-mcp`: Para ler comentários, pegar estatísticas e (futuramente) postar.
    *   `filesystem-mcp` (Via Desktop Bridge): Para ver quais vídeos brutos estão na pasta do seu PC.
*   **Ações Autônomas**:
    *   Analisar comentários do YouTube: *"Daniel, estão pedindo muito vídeo sobre 'Testosterona e Café'."*
    *   Sugerir 5 títulos virais baseados no seu canal.

### ✂️ `@video_editor` (O Operário do PC)
*   **Missão**: Executar a edição pesada no seu Windows.
*   **MCPs Necessários**:
    *   `local-command-mcp` (Via Desktop Bridge): Acesso ao FFmpeg e Python scripts locais.
*   **Ações Autônomas**:
    *   Receber comando da VPS: *"Corte os silêncios do vídeo 'raw_01.mp4'"*.
    *   Rodar o script Python localmente e avisar quando terminar.

## 3. Próximos Passos de Implementação
Para cada agente acima, faremos:
1.  **Arquivo de Definição**: Criar o arquivo `.md` do agente com sua personalidade e regras.
2.  **Instalação de MCP**: Configurar o servidor MCP correspondente (ex: conectar seu Token do ClickUp).
3.  **Teste de Permissão**: Garantir que o agente `@project_manager` consiga ler o ClickUp mas não consiga deletar o banco de dados.

---

### Prioridade de Execução (Sugerida)
1.  **`@content_director` + `@video_editor`**: Pois alivia seu gargalo de produção de conteúdo imediato.
2.  **`@project_manager`**: Para organizar a casa com o Marinho Jr.
3.  **`@sales_force`**: Para otimizar o BioLift.
