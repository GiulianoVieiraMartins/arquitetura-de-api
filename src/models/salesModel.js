const { connection } = require('./connection');

const idSales = async (id) => {
  const listId = id.map((item) => item.productId).map((_) => '?').join(', ');
  const [result] = await connection
    .execute(`SELECT * FROM StoreManager.products WHERE id IN (${listId})`,
      id.map((item) => item.productId));
  return result;
};

const saleInsert = async (newSale) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');

  const a = await Promise.all(newSale.map(async (el) => {
    await connection.execute(`INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
      [insertId, el.productId, el.quantity]);
    return el;
  }));
  const saleDone = {
    id: insertId,
    itemsSold: a,
  };
  return saleDone;
};

module.exports = {
  saleInsert,
  idSales,
};