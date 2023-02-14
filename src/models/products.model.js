const { connection } = require('./connection');

const getAll = async () => {
  const list = await connection.execute('SELECT * FROM products'); 
  return list[0];
};

const getById = async (id) => {
  const [list] = await connection.execute('SELECT * FROM products WHERE id = (?)', [id]);
  return list[0];
};

module.exports = { getAll, getById };