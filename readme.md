# Firebase Cloud Messaging (FCM) Node.js Server

Este repositório contém um servidor Node.js básico para interagir com o Firebase Cloud Messaging (FCM) e enviar notificações push para dispositivos móveis. O servidor utiliza o framework Express para gerenciar rotas e interações HTTP, juntamente com o módulo Firebase Admin SDK para comunicação com o FCM.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes dependências instaladas:

- [Node.js](https://nodejs.org/)
- [Firebase Project](https://firebase.google.com/) com credenciais (arquivo `firebase.json`)
- [Yarn](https://yarnpkg.com/) (opcional, mas recomendado para gerenciamento de pacotes)

## Configuração

1. Clone o repositório e navegue até o diretório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Substitua `firebase.json` com suas próprias credenciais do Firebase.

## Uso

### Iniciar o servidor

Execute o seguinte comando para iniciar o servidor:

```bash
yarn start
```

O servidor estará em execução na porta 3000.

### Rotas disponíveis

- `POST /register/tokens`: Inscreve dispositivos em um tópico para receber notificações.
  - Parâmetros:
    - `topic` (string): Nome do tópico.
    - `tokens` (array de strings): Tokens dos dispositivos a serem inscritos.

- `POST /remove/tokens`: Remove dispositivos de um tópico para interromper o recebimento de notificações.
  - Parâmetros:
    - `topic` (string): Nome do tópico.
    - `tokens` (array de strings): Tokens dos dispositivos a serem removidos.

- `GET /tokens/:topic`: Obtém a lista de tokens inscritos em um determinado tópico.
  - Parâmetros:
    - `topic` (string): Nome do tópico.

- `POST /send-push`: Envia uma notificação push para um tópico específico.
  - Parâmetros:
    - `title` (string): Título da notificação.
    - `description` (string): Descrição da notificação.
    - `topic` (string): Nome do tópico.

## Exemplo de Uso

1. Inscrever dispositivos em um tópico:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"topic":"nome-do-topico","tokens":["token-dispositivo1","token-dispositivo2"]}' http://localhost:3000/register/tokens
   ```

2. Remover dispositivos de um tópico:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"topic":"nome-do-topico","tokens":["token-dispositivo1","token-dispositivo2"]}' http://localhost:3000/remove/tokens
   ```

3. Obter tokens inscritos em um tópico:

   ```bash
   curl http://localhost:3000/tokens/nome-do-topico
   ```

4. Enviar uma notificação push:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"title":"Título da Notificação","description":"Descrição da Notificação","topic":"nome-do-topico"}' http://localhost:3000/send-push
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir problemas (issues) ou enviar pull requests com melhorias.
