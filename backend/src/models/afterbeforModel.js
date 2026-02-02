class AfterBeforModel {
  constructor({ before, after }) {
    this.before = before;
    this.after = after; 
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = AfterBeforModel;

