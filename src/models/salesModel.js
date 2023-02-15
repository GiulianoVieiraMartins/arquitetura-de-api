const { connection } = require('./connection');

const insertSale = async (newSale) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  const sale = await Promise.all(newSale.map(async (element) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
      [insertId, element.productId, element.quantity]);
    return element;
  }));
  const saleDone = {
    id: insertId,
    itemsSold: sale,
  };
  return saleDone;
};

const idSales = async (id) => {
  const a = id.map((item) => item.productId).map((_) => '?').join(', ');
  const query = `SELECT * FROM StoreManager.products WHERE id IN (${a})`;
  const result = await connection.execute(query, id.map((item) => item.productId));
  return result[0];
};

module.exports = {
  insertSale,
  idSales,
};