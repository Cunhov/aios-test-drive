# Plano de Dominação Digital com Synkra AIOS

## Visão Geral
Você tem um ecossistema complexo (Fitness, Infoprodutos, Consultoria) operado majoritariamente por você (Eupreendedor) e uma pequena equipe no projeto parceiro. Seu gargalo é tempo operacional. O AIOS será seu **Gerente de Operações Digital**, orquestrando suas ferramentas atuais (n8n, Evolution API, Notion) com inteligência agêntica.

## Estrutura de Squads Proposta

O Synkra AIOS funciona com "Squads" (equipes). Vamos criar squads virtuais para substituir/augmentar suas funções atuais.

### 1. Squad de Conteúdo & Tráfego Orgânico (Para seus canais)
*   **Objetivo**: Escalar a produção de conteúdo sem aumentar seu trabalho manual.
*   **Agentes**:
    *   `@social-media-manager`: Planeja o calendário editorial no Notion/ClickUp baseando-se em tendências.
    *   `@copywriter`: Escreve roteiros de Reels, legendas e e-mails para o BioLift.
    *   `@video-editor-automator`: (Via n8n) Pega cortes brutos e gera versões finais (você já tem algo assim, vamos deixar mais inteligente).

### 2. Squad Técnico & Automação (Seu "Eu" Técnico)
*   **Objetivo**: Manter e evoluir sua VPS, n8n e APIs sem você precisar codar tudo.
*   **Agentes**:
    *   `@devops`: Monitora sua VPS na Hostinger, verifica logs do Portainer.
    *   `@backend-dev`: Cria novos scripts para o n8n ou ajusta integrações da Evolution API.
    *   *Caso de Uso*: "Criei um novo produto no Kiwify, configure o webhook no n8n para liberar acesso no Drive." -> O agente gera o JSON do n8n para você importar.

### 3. Squad de Gestão (Para o Projeto Marinho Jr)
*   **Objetivo**: Organizar a equipe de 4 pessoas e garantir entregas.
*   **Agentes**:
    *   `@pm` (Product Manager): Transforma as ideias do Marinho em tarefas no ClickUp.
    *   `@scrum-master`: Cobra a equipe (via WhatsApp/Evolution API) sobre status de tarefas.

---

## Integração "Controle Remoto" (Mobile)

Você mencionou querer comandar tudo pelo celular.
*   **Solução**: Vamos criar um "Bypass" onde você manda áudio no WhatsApp para um número específico (conectado na Evolution API).
*   **Fluxo**: Áudio -> Evolution API -> n8n (Transcrever com Whisper) -> **AIOS (Interpreta Comando)** -> Executa Ação -> Responde no WhatsApp.

## Plano de Implementação (Fases)

### Fase 1: A "Secretária" Inteligente (Quick Win)
Conectar o AIOS ao seu Notion/ClickUp.
*   Você pede: "Planeje 5 reels sobre calistenia para iniciantes baseados no vídeo X do YouTube".
*   AIOS: Cria os roteiros e salva no Notion.

### Fase 2: O Engenheiro de Automação
Usar o AIOS para gerar workflows do n8n.
*   Em vez de arrastar caixinhas do zero, você pede pro agente `@dev`: "Gere um workflow n8n que recebe webhook da Kiwify e manda mensagem na Evolution API". Ele gera o código JSON do workflow.

### Fase 3: O Gestor de Equipe
Configurar o agente para ler o ClickUp da equipe do Marinho e gerar relatórios diários para você.

## Próximos Passos
Vou criar um documento detalhando a arquitetura dessa integração "WhatsApp -> AIOS -> Mundo".
