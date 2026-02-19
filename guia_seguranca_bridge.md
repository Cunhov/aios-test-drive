# 🛡️ Segurança: Como a VPS "Conversa" com seu PC

Daniel, sua preocupação é legítima. Vamos desmistificar o "controle" da VPS sobre seu computador.

## 1. O Conceito: Não é "Acesso Remoto", é "Solicitação de Serviço"
A VPS **NÃO** tem acesso à sua Área de Trabalho, mouse, teclado ou webcam. Ela não funciona como um TeamViewer ou AnyDesk.

### O Fluxo Real:
1.  **VPS (O Cliente)**: Quando você pede no WhatsApp "Edite o vídeo X", a IA na VPS pensa: *"Eu não tenho poder de processamento de vídeo aqui, preciso pedir para o PC do Daniel"*.
2.  **O Pedido (JSON)**: A VPS envia uma mensagem de texto criptografada pelo túnel:
    ```json
    {
      "acao": "executar_comando",
      "comando": "python scripts/process_video.py --input treino.mp4"
    }
    ```
3.  **O Porteiro (Desktop Bridge)**: No seu PC, o script `desktop-bridge.js` recebe essa mensagem. **Ele é a única coisa que a VPS enxerga.**
4.  **A Execução**: O script local diz: *"Ok, recebi um pedido para rodar o script de vídeo. Vou rodar."*. E ele executa o comando no seu terminal Windows.

## 2. O que a VPS pode e NÃO pode fazer?

| A VPS Pode ✅ | A VPS NÃO Pode ❌ |
| :--- | :--- |
| Pedir para rodar comandos que você permitiu no `desktop-bridge.js`. | Ver sua tela ou mexer no mouse. |
| Ler arquivos dentro da pasta do projeto (se permitido). | Ler seus documentos pessoais, fotos ou senhas fora da pasta. |
| Enviar logs de volta ("O vídeo ficou pronto"). | Instalar vírus ou programas sem você saber. |

## 3. Quem manda é você
O script `desktop-bridge.js` roda no **SEU** computador.
*   Se você fechar o terminal do script, a conexão morre instantaneamente.
*   Você pode configurar o script para **só aceitar** comandos específicos (ex: apenas comandos que começam com `python` ou `ffmpeg`).

## 4. Resumo Técnico
É uma API Reversa. Você não está abrindo seu PC para o mundo; você está abrindo uma "janelinha" (porta 3001) que só aceita bilhetes específicos vindos da sua VPS autenticada.

---

### Conclusão
Você tem o controle total. A VPS é apenas um "cérebro remoto" que envia pedidos. O "braço" que executa é o script local, e ele obedece às regras que definirmos no seu PC.
