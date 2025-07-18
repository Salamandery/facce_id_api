# 🛡️ Facce ID API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-10.15.0-blue?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Express-4.17.1-green?style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/badge/OracleDB-Database-orange?style=for-the-badge&logo=oracle"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql"/>
  <img src="https://img.shields.io/badge/Socket.io-2.2.0-black?style=for-the-badge&logo=socket.io"/>
</p>

<div align="center">
  <b>🇧🇷 Português | <a href="#english-version">🇺🇸 English below</a></b>
</div>

---

## 📑 Sumário | Table of Contents
- [Sobre o Projeto | About](#sobre-o-projeto--about)
- [Tecnologias | Technologies](#tecnologias--technologies)
- [Estrutura | Structure](#estrutura--structure)
- [Configuração | Setup](#configuração--setup)
- [Banco de Dados | Database](#banco-de-dados--database)
- [Endpoints](#endpoints)
- [Autor | Author](#autor--author)

---

## Sobre o Projeto | About

**PT-BR:**
> API Node.js para autenticação, controle de acesso e gestão de prestadores, contratos e registros de entrada/saída. Utiliza Express, OracleDB, PostgreSQL e Socket.io para comunicação em tempo real e persistência de dados. 

**EN:**
> Node.js API for authentication, access control, and management of providers, contracts, and entry/exit records. Uses Express, OracleDB, PostgreSQL, and Socket.io for real-time communication and data persistence.

---

## 🚀 Tecnologias | Technologies
- Node.js 10.15+
- Express 4.17+
- OracleDB
- PostgreSQL
- Socket.io
- dotenv, ejs, body-parser, express-session, express-validator, consign

---

## 🗂️ Estrutura | Structure
```
facce_id_api/
├── bin/
│   ├── controllers/
│   ├── models/
│   ├── router/
│   └── server/
├── db.sql
├── package.json
├── README.md
├── server.js
├── server_sml.js
```

---

## ⚙️ Configuração | Setup

**PT-BR:**
1. **Pré-requisitos:** Node.js 10.15+, OracleDB, PostgreSQL, npm
2. **Instalação:**
   ```bash
   npm install
   ```
3. **Configuração de ambiente:**
   - Crie um arquivo `.env` com as variáveis de conexão para OracleDB e PostgreSQL.
4. **Banco de dados:**
   - Execute o script `db.sql` para criar as tabelas e views necessárias.
5. **Execução:**
   ```bash
   npm start
   ```
   O serviço estará em `http://localhost:3000` (ou porta definida).

**EN:**
1. **Prerequisites:** Node.js 10.15+, OracleDB, PostgreSQL, npm
2. **Install:**
   ```bash
   npm install
   ```
3. **Environment setup:**
   - Create a `.env` file with your OracleDB and PostgreSQL connection variables.
4. **Database:**
   - Run the `db.sql` script to create the required tables and views.
5. **Run:**
   ```bash
   npm start
   ```
   The service will be at `http://localhost:3000` (or your configured port).

---

## 🗄️ Banco de Dados | Database
- **PT-BR:** O projeto utiliza OracleDB e PostgreSQL. O script de criação está em `db.sql`.
- **EN:** The project uses OracleDB and PostgreSQL. The creation script is in `db.sql`.

---

## 📡 Endpoints

- **Autenticação:** `/login` (POST)
- **Menu:** `/menu` (GET)
- **Navegação:** `/nav` (GET)
- **Portal:** `/portal` (GET)
- **Sair:** `/sair` (GET)
- **APIs adicionais para gestão de prestadores, contratos, registros, etc.**

> Consulte os arquivos em `bin/router/` para detalhes de cada rota.

---

## 👤 Autor | Author

<div align="center">
  <b>Feito com 💙 para estudos de Node.js, Express, OracleDB, PostgreSQL e APIs REST.<br/>
  Made with 💙 for Node.js, Express, OracleDB, PostgreSQL and REST API studies.</b>
</div>

---

<div align="center" id="english-version">
  <b>🇺🇸 English version above | <a href="#top">🇧🇷 Versão em português acima</a></b>
</div>