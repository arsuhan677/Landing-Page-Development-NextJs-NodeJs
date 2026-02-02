class Order {
  constructor({ name, mobile, address, district, note, quantity, total, status }) {
    this.name = name;
    this.mobile = mobile;
    this.address = address;
    this.district = district;
    this.note = note || "";
    this.quantity = quantity || 1;
    this.total = total || 0;
    this.status = status || "pending";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Order;
