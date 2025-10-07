const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const db = new sqlite3.Database('./doceria.db');

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public')); // pasta onde estão seus HTMLs e CSS

// Criação das tabelas (apenas na primeira execução)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT, email TEXT UNIQUE, senha TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT, descricao TEXT, preco REAL, imagem TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS compras (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER, data_compra DATETIME DEFAULT CURRENT_TIMESTAMP, total REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS itens_compra (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    compra_id INTEGER, produto_id INTEGER, quantidade INTEGER, preco_unitario REAL
  )`);
});

// Cadastro de usuário
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;
  const senhaHash = await bcrypt.hash(senha, 10);
  db.run(`INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`, [nome, email, senhaHash],
    err => err ? res.status(400).json({ erro: 'Email já existe' }) : res.json({ sucesso: true })
  );
});

// Login de usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, usuario) => {
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    res.json({ sucesso: true, usuario });
  });
});

// Iniciar servidor
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
