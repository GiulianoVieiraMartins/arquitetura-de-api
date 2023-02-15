const salesModel = require('./models/salesModel');

const insertSale = async (newSale) => {
  const saleId = await salesModel.idSales(newSale);
  if (saleId.length !== newSale.length) {
    return { type: 404, message: 'Product not found' };
  }
  const sd = await salesModel.insertSale(newSale);
  return sd;
};

module.exports = {
  insertSale,
};