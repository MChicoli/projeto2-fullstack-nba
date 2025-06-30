# Projeto 2: NBA Player Search (Programação Web Fullstack - ES47B)

Este projeto é uma aplicação web fullstack desenvolvida para a disciplina **ES47B - Programação Web Fullstack** da UTFPR-CP. A aplicação permite que usuários autenticados pesquisem, insiram e removam informações sobre jogadores da NBA.

- **Mateus Chicoli Pedreira** (RA: 2346540)

---

## ✅ Funcionalidades Implementadas

- ✅ **Login de Usuário**: Autenticação de usuários pré-cadastrados no sistema usando JWT.
- ✅ **Busca de Jogadores**: Usuários logados podem buscar jogadores pelo nome, com cache no backend para otimização.
- ✅ **Inserção de Jogadores**: Inserção individual ou em massa (rota protegida).
- ✅ **Remoção de Jogadores**: Exclusão via botão no frontend, com rota protegida.
- ✅ **Validação e Sanitização**: Em todas as entradas do usuário no backend.
- ✅ **Segurança**: Helmet, rate-limit, bcrypt, logs, verificação de token e HTTPS.

---

## 🧱 Arquitetura e Tecnologias Utilizadas

### 🔹 Frontend: React.js
- `react-router-dom`: SPA com rotas protegidas
- `react-hook-form`: Gerenciamento e validação de formulários
- `Context API`: Controle global da lista de jogadores

### 🔹 Backend: Node.js + Express
- `JWT`: Autenticação baseada em token
- `bcrypt`: Hashing de senhas
- `express-validator`: Validação e sanitização
- `helmet` + `rate-limit`: Proteção contra ataques comuns
- `compression`: Otimização de respostas
- `memory-cache`: Cache para a rota de busca
- `fs`: Log de eventos em arquivo

### 🔹 Banco de Dados: PostgreSQL
- `Sequelize`: ORM para modelagem e queries
- Pool de conexões habilitado para performance

---

## ⚙️ Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### 1. Pré-requisitos

- Node.js (v18 ou superior)
- npm (instalado com o Node.js)
- PostgreSQL

### 2. Configuração do Ambiente (`.env`)

O projeto utiliza um arquivo `.env` na raiz da pasta `backend/` para armazenar variáveis sensíveis como as credenciais do banco de dados e segredos de autenticação.

**O arquivo `.env` já preenchido será incluído no arquivo `.zip` da entrega.** Só precisa colocá-lo na pasta `backend/`.

O arquivo terá a seguinte estrutura:
```env
PORT=5000
DATABASE_URL=postgresql://USUARIO:SENHA@HOST:PORTA/BANCO
JWT_SECRET=AlgumacoisaAleatória

.env vai conter o login e senha para acessar o sistema
```

### 3. Passos para Execução

```bash
# 1. Clone o repositório
git clone (https://github.com/MChicoli/projeto2-fullstack-nba)
cd [nome-da-pasta-do-projeto]

# 2. Instale as dependências do Backend
cd backend
npm install

# 3. Instale as dependências do Frontend
Em outro terminal
cd ../frontend
npm install

# 4. Configure o .env no Backend
#    (Copie o arquivo .env fornecido no .zip para a pasta /backend)

# 5. Crie o usuário administrador no banco de dados
#    (No terminal, dentro da pasta /backend)
node src/seedUser.js

# 6. Inicie os servidores
#    (Você precisará de dois terminais abertos)

# Terminal 1: Iniciar o Backend (na pasta /backend)
npm run dev

# Terminal 2: Iniciar o Frontend (na pasta /frontend)
npm run dev
```

A aplicação frontend estará disponível em `http://localhost:5173`.

---
