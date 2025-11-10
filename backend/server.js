const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost3306',      // ou 127.0.0.1
  user: 'root',           // seu usuário MySQL
  password: '123abc',           // sua senha (se tiver)
  database: 'cadastrotest'  // nome do banco que você criou
});

// Teste da conexão
db.connect((err) => {
  if (err) {
    console.log('❌ Erro ao conectar no banco:', err);
  } else {
    console.log('✅ Conectado ao MySQL!');
  }
});

// 🔹 Rota
