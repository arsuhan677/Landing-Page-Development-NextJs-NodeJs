class Review {
  constructor({ name, title, description, rating}) {
    this.name = name;
    this.title = title;
    this.rating = rating;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

module.exports = Review;
