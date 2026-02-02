class Ingredients {
  constructor({title, description}) {
    this.title = title;
    this.description = description;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

module.exports = Ingredients;
