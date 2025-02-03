let products = [
  { id: 1, name: 'Nike Airforce 1', description: 'Tolles paar Schuhe', price: 89.99 },
  { id: 2, name: 'Dell XPS 13 2024', description: 'Leistungsstarker Laptop', price: 1899.99 },
  { id: 3, name: 'Apple iPhone 13', description: 'Neuestes iPhone', price: 999.99 },
  { id: 4, name: 'Apple Watch Series 7', description: 'Smartwatch von Apple', price: 399.99 },
  { id: 5, name: 'Sony WH-1000XM4', description: 'Noise Cancelling Kopfhörer', price: 349.99 },
  { id: 6, name: 'Nintendo Switch', description: 'Spielekonsole von Nintendo', price: 299.99 },
  { id: 7, name: 'Sony A7 III', description: 'Spiegellose Vollformatkamera', price: 1799.99 },
  { id: 8, name: 'Logitech MX Master 3', description: 'Kabellose Maus', price: 99.99 },
  { id: 9, name: 'Bose QuietComfort 45', description: 'Noise Cancelling Kopfhörer', price: 329.99 },
  { id: 10, name: 'Samsung Galaxy S21', description: 'Smartphone von Samsung', price: 799.99 },
];

class Product {
  static findAll(sort) {
    if (sort === 'price_asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }

  static findById(id) {
    return products.find((product) => product.id === id);
  }

  static create(data) {
    const newProduct = { id: products.length + 1, ...data };
    products.push(newProduct);
    return newProduct;
  }

  static update(id, data) {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.name = data.name;
      product.description = data.description;
      product.price = data.price;
    }
    return product;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      return products.splice(index, 1)[0];
    }
    return null;
  }
}

export default Product;
