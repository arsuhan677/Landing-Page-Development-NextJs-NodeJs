class Hero {
  constructor({ title, subtitle, description, rating, price, discount, image }) {
    this.title = title;
    this.price = price;
    this.discount = discount;
    this.image = image;
    this.subtitle = subtitle;
    this.description = description;
    this.rating = rating;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

module.exports = Hero;
