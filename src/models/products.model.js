const { connection } = require('./connection');

const getAll = async () => {
  const [list] = await connection.execute('SELECT * FROM products'); 
  return list;
};
// storemanager
const getById = async (id) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product;
};

const insertion = async (newProduct) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUE (?)';
  const [{ insertId }] = await connection.execute(query, [newProduct]);
  return insertId;
};

module.exports = { getAll, getById, insertion };