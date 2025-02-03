import Product from '../models/product-model.js';

export const getAllProducts = (req, res) => {
  const sort = req.query.sort;
  const products = Product.findAll(sort);
  res.json({ data: products });
};

export const getProductById = (req, res) => {
  const product = Product.findById(parseInt(req.params.id));
  if (product) {
    res.json({ data: product });
  } else {
    res.status(404).json({ error: 'Produkt nicht gefunden' });
  }
};

export const createProduct = (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || price == null) {
    return res.status(400).json({ error: 'Bitte fülle alle Felder aus (name, description, price)' });
  }
  const newProduct = Product.create({ name, description, price });
  res.status(201).json({ data: newProduct });
};

export const updateProduct = (req, res) => {
  const { name, description, price } = req.body;
  if (!name || !description || price == null) {
    return res.status(400).json({ error: 'Bitte fülle alle Felder aus (name, description, price)' });
  }

  const updatedProduct = Product.update(parseInt(req.params.id), { name, description, price });
  if (updatedProduct) {
    res.json({ data: updatedProduct });
  } else {
    res.status(404).json({ error: 'Produkt nicht gefunden' });
  }
};

export const deleteProduct = (req, res) => {
  const deletedProduct = Product.delete(parseInt(req.params.id));
  if (deletedProduct) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Produkt nicht gefunden' });
  }
};
