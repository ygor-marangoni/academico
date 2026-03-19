# Acadêmico

[![Status](https://img.shields.io/badge/status-ativo-3b5bdb)](./README.md)
[![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-111827)](./README.md)
[![Backend](https://img.shields.io/badge/backend-Node%20%7C%20Express-2563eb)](./README.md)
[![Banco](https://img.shields.io/badge/banco-MongoDB%20Atlas-22c55e)](./README.md)

Aplicação web para organização acadêmica com calendário interativo, tarefas, filtros, tema escuro, recorrência semanal e autenticação com email/senha ou Google.

## Stack

- Frontend estático em HTML, CSS e JavaScript puro
- Backend em Node.js + Express
- Banco de dados MongoDB Atlas
- Autenticação por email/senha com JWT em cookie HTTP-only
- Login com Google OAuth 2.0

## O que o projeto já faz

- Visualização por Mês, Semana e Agenda
- CRUD de tarefas
- Busca e filtros por tipo, disciplina, prioridade e status
- Tema claro/escuro com persistência
- Recorrência semanal
- Uso sem login com `localStorage`
- Uso com login com sincronização em nuvem
- Importação de tarefas locais para a conta
- Tela de autenticação separada em `auth.html`

## Estrutura do projeto

```text
academico/
|- index.html
|- auth.html
|- style.css
|- script.js
|- auth.js
|- config.js
|- README.md
|- SETUP_DEPLOY.md
|- render.yaml
`- server/
   |- package.json
   |- .env.example
   `- src/
      |- server.js
      |- app.js
      |- config/
      |- controllers/
      |- middlewares/
      |- models/
      |- routes/
      |- services/
      `- utils/
```

## Como rodar localmente

### 1. Frontend

Na raiz do projeto:

```bash
python -m http.server 5500
```

Abra:

```text
http://localhost:5500
```

### 2. Backend

Entre em `server/`, copie `.env.example` para `.env`, preencha as variáveis e rode:

```bash
npm install
npm run dev
```

API local:

```text
http://localhost:3000
```

Health check:

```text
http://localhost:3000/health
```

## Variáveis importantes do backend

Exemplo em `server/.env.example`:

```env
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5500
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
COOKIE_NAME=academico_token
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

## Fluxo de autenticação

- Visitante: usa `localStorage`
- Usuário logado: usa API + MongoDB
- Login local: `POST /api/auth/register` e `POST /api/auth/login`
- Sessão: cookie HTTP-only
- Google login: `GET /api/auth/google`
- Sessão atual: `GET /api/auth/me`
- Logout: `POST /api/auth/logout`

## Deploy recomendado

- Frontend: Netlify
- Backend: Render
- Banco: MongoDB Atlas
- Guia completo: [SETUP_DEPLOY.md](/c:/Users/drz/Desktop/Faculdade/IA/trabalho%20pratico/academico/SETUP_DEPLOY.md)

## Observações importantes

- O README antigo dizia que o projeto era apenas estático. Isso não é mais verdade.
- Hoje o projeto já depende de backend para login e sincronização em nuvem.
- Para uso sem login, o sistema continua funcionando localmente.

## Próximos passos recomendados

- Revisar mensagens e encoding restantes da `index.html` e `script.js`
- Validar o fluxo completo em produção no Netlify + Render
- Atualizar o `config.js` com a URL final do backend
- Rodar checklist completo de auth e CRUD após deploy
