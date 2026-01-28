class Product {
  constructor({ name, price, discount = 0, image, stock = true, description, is_active = true }) {
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.image = image;
    this.stock = stock;
    this.description = description;
    this.is_active = is_active;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

module.exports = Product;
