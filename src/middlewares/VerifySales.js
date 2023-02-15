const validateSaleId = (req, res, next) => {
  const newSale = req.body;
  const verifyProductId = (torso) => torso.every((i) => i.productId);
  const verifyQuantity = (torso) => torso.every((i) => i.quantity === 0 || i.quantity < 0);
  const error = (torso) => torso.every((i) => i.quantity);
  if (!verifyProductId(newSale)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!verifyProductId(newSale)) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  if (verifyQuantity(newSale)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!error(newSale)) return res.status(400).json({ message: '"quantity" is required' });
  next();
}; 
module.exports = validateSaleId;