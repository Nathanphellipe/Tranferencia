const express = require('express');
const cors = require('cors');
const connection = require('./db'); // conexão com o banco

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Teste de conexão
app.get('/testar-conexao', (req, res) => {
  connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro na conexão com o banco', detalhes: err });
    }
    res.json({ mensagem: 'Conexão bem-sucedida!', resultado: results[0].resultado });
  });
});

// ✅ Novo endpoint para listar voos
app.get('/voos', (req, res) => {
  const { origem, destino, saida, chegada } = req.query;

  

  const query = 
  'SELECT * FROM dados WHERE origem = ? AND destino = ? AND DATE(saida) >= ? AND DATE(chegada) <= ?';

  connection.query(query, [origem, destino, saida, chegada], (err, results) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao consultar o banco de dados', detalhes: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensagem: 'Nenhum voo encontrado com esses parâmetros.' });
    }

    res.json(results);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
