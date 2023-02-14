const express = require('express');
const productsModel = require('./models/products.model');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', async (_req, res) => {
  const list = await productsModel.getAll();
  return res.status(200).json(list);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.getById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

// não remova essa exportação, é para o avaliador funcionar.
// você pode registrar suas rotas normalmente, como o exemplo acima.
// você deve usar o arquivo index.js para executar sua aplicação.
module.exports = app;