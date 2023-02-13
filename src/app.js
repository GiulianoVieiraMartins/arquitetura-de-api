const express = require('express');
const getAll = require('./models');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (req, res) => {
  const a = await getAll();
  return res.status(200).json(a);
});

// pq esse endpoint não funciona
// como acessar o banco de dados pelo workbench? como que eu sei as colunas e tableas do banco de dados?

// não remova essa exportação, é para o avaliador funcionar.
// você pode registrar suas rotas normalmente, como o exemplo acima.
// você deve usar o arquivo index.js para executar sua aplicação.
module.exports = app;