# Setup e Deploy do Zero

Este guia foi escrito para quem nunca publicou backend antes.

Arquitetura recomendada para este projeto:

- Frontend estático no Netlify
- Backend Node.js + Express no Render
- Banco MongoDB Atlas
- Login Google via Google Cloud

## 1. O que você precisa instalar no seu computador

Antes de tudo, instale:

1. Node.js 20 ou superior
2. Git
3. Python ou outra forma de servir arquivos estáticos localmente
4. Uma conta em cada serviço:
   - GitHub
   - Netlify
   - Render
   - MongoDB Atlas
   - Google Cloud Console

## 2. Entenda a divisão do projeto

- Raiz do projeto: frontend
- Pasta `server/`: backend
- `config.js`: URL do backend usada pelo frontend
- `server/.env.example`: exemplo de variáveis do backend

## 3. Rodar tudo localmente primeiro

### Frontend local

Na raiz do projeto:

```bash
python -m http.server 5500
```

Depois abra:

```text
http://localhost:5500
```

### Backend local

Entre na pasta `server/`:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Se estiver no Windows PowerShell e `cp` não funcionar:

```powershell
Copy-Item .env.example .env
```

## 4. Criar o banco no MongoDB Atlas

1. Entre em https://www.mongodb.com/atlas
2. Crie uma conta
3. Crie um projeto novo
4. Crie um cluster gratuito `M0`
5. Vá em `Database Access`
6. Crie um usuário do banco
7. Guarde:
   - username
   - password
8. Vá em `Network Access`
9. Adicione `0.0.0.0/0` para liberar acesso de qualquer IP no MVP
10. Volte ao cluster e clique em `Connect`
11. Escolha `Drivers`
12. Copie a connection string

Exemplo:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster.mongodb.net/academico?retryWrites=true&w=majority&appName=Cluster0
```

## 5. Criar o projeto OAuth no Google

1. Entre em https://console.cloud.google.com/
2. Crie um projeto
3. Vá em `APIs & Services`
4. Configure a tela de consentimento OAuth
5. Depois vá em `Credentials`
6. Clique em `Create Credentials`
7. Escolha `OAuth Client ID`
8. Tipo: `Web application`

Cadastre estes dados locais:

### Authorized JavaScript origins

- `http://localhost:5500`

### Authorized redirect URIs

- `http://localhost:3000/api/auth/google/callback`

Depois copie:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## 6. Preencher o `.env` do backend local

Edite `server/.env` com algo assim:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5500
MONGODB_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@SEU_CLUSTER.mongodb.net/academico?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=crie-uma-chave-grande-e-segura
JWT_EXPIRES_IN=7d
COOKIE_NAME=academico_token
GOOGLE_CLIENT_ID=cole-aqui
GOOGLE_CLIENT_SECRET=cole-aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

## 7. Configurar o frontend para o backend local

No arquivo `config.js`, deixe:

```js
window.APP_CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
};
```

## 8. Rodar o backend local

Na pasta `server/`:

```bash
npm run dev
```

Teste no navegador:

```text
http://localhost:3000/health
```

Se estiver certo, deve aparecer algo como:

```json
{"ok":true,"environment":"development"}
```

## 9. Testar tudo localmente antes do deploy

Abra o frontend em `http://localhost:5500` e teste:

1. Criar conta com email e senha
2. Fazer login
3. Fazer logout
4. Criar tarefas logado
5. Atualizar a página
6. Confirmar que as tarefas continuam lá
7. Fazer login com Google
8. Confirmar que a sessão volta após refresh

## 10. Subir o projeto no GitHub

Se o projeto ainda não estiver no GitHub:

```bash
git init
git add .
git commit -m "Projeto inicial"
```

Crie um repositório no GitHub e conecte:

```bash
git remote add origin URL_DO_REPOSITORIO
git branch -M main
git push -u origin main
```

## 11. Publicar o backend no Render

Entre em https://render.com/

Você tem dois caminhos.

### Caminho mais fácil: com `render.yaml`

1. Clique em `New`
2. Escolha `Blueprint`
3. Conecte o GitHub
4. Selecione o repositório
5. O Render vai ler `render.yaml`

Depois preencha manualmente estas variáveis:

- `CLIENT_URL`
- `MONGODB_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

### Caminho manual

1. Clique em `New Web Service`
2. Conecte o GitHub
3. Selecione o repositório
4. Configure:
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

Depois configure as variáveis:

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://SEU-FRONT.netlify.app
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
COOKIE_NAME=academico_token
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=https://SEU-BACKEND.onrender.com/api/auth/google/callback
```

Quando terminar, copie a URL do backend. Exemplo:

```text
https://academico-api.onrender.com
```

Teste:

```text
https://academico-api.onrender.com/health
```

## 12. Publicar o frontend no Netlify

Entre em https://www.netlify.com/

1. Clique em `Add new site`
2. Escolha `Import an existing project`
3. Conecte o GitHub
4. Selecione o repositório
5. Use:
   - Base directory: vazio
   - Build command: vazio
   - Publish directory: `.`

Depois do deploy, copie a URL do frontend. Exemplo:

```text
https://academico-app.netlify.app
```

## 13. Conectar frontend e backend em produção

Agora volte no `config.js` e troque a URL local pela URL pública do Render:

```js
window.APP_CONFIG = {
  API_BASE_URL: 'https://SEU-BACKEND.onrender.com',
};
```

Faça commit e push:

```bash
git add config.js
git commit -m "Configura API de produção"
git push
```

O Netlify vai republicar o site.

## 14. Atualizar Google OAuth para produção

Volte no Google Cloud e adicione:

### Authorized JavaScript origins

- `https://SEU-FRONT.netlify.app`

### Authorized redirect URIs

- `https://SEU-BACKEND.onrender.com/api/auth/google/callback`

## 15. Conferir o `CLIENT_URL` no Render

No Render, `CLIENT_URL` precisa bater exatamente com a URL do Netlify:

```env
CLIENT_URL=https://SEU-FRONT.netlify.app
```

Sem barra sobrando no final.

## 16. Checklist final de produção

Depois de tudo conectado, teste:

1. Abrir o frontend no Netlify
2. Criar conta por email
3. Fazer login por email
4. Fazer logout
5. Fazer login com Google
6. Criar tarefas logado
7. Atualizar a página
8. Confirmar persistência
9. Testar uso sem login
10. Testar importação de tarefas locais para a conta

## 17. Problemas comuns

### O Google dá erro de redirect URI

Confira se estas URLs estão idênticas no Google Cloud:

- `http://localhost:3000/api/auth/google/callback`
- `https://SEU-BACKEND.onrender.com/api/auth/google/callback`

### O login funciona, mas a sessão não persiste

Confira:

- `credentials: 'include'` no frontend
- `CLIENT_URL` certo no Render
- `NODE_ENV=production`
- backend e frontend usando HTTPS em produção

### O frontend abre, mas não loga

Confira:

- `config.js` apontando para a URL real do Render
- backend no ar
- `/health` respondendo

### O backend sobe, mas o banco falha

Confira:

- usuário e senha do Atlas
- IP liberado
- connection string correta

### O Render demora para responder

No plano gratuito isso pode acontecer em projetos hobby.

## 18. Ordem ideal para você não se perder

1. Rodar tudo localmente
2. Testar cadastro/login local
3. Testar Google local
4. Subir para GitHub
5. Publicar backend no Render
6. Publicar frontend no Netlify
7. Atualizar `config.js`
8. Atualizar Google OAuth
9. Testar produção

## 19. Observação final

Hoje o projeto já tem a base pronta de:

- autenticação local
- autenticação com Google
- backend Express
- MongoDB
- sincronização por usuário

O seu trabalho daqui para frente é principalmente configuração e validação do ambiente.
