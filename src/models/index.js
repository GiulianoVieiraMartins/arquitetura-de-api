const connection = require('./connection');

const getAll = async () => {
  const list = await connection.execute('SELECT * FROM products'); 
  return list;
};

module.exports = getAll;