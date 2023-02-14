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

app.post('/products', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  } if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const newProduct = await productsModel.insertion(name);
  return res.status(201).json({ id: newProduct, name });
});

// não remova essa exportação, é para o avaliador funcionar.
// você pode registrar suas rotas normalmente, como o exemplo acima.
// você deve usar o arquivo index.js para executar sua aplicação.
module.exports = app;