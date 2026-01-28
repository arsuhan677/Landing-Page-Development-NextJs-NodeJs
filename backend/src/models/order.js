class Order {
  constructor({ customer, products }) {
    if (!customer || !products || products.length === 0) {
      throw new Error("Customer info and products are required");
    }

    this.orderId = "ORD-" + Date.now();

    this.customer = {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    };

    this.products = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      discount: p.discount || 0,
      quantity: p.quantity || 1,
    }));

    this.totalAmount = this.products.reduce((sum, p) => {
      const priceAfterDiscount = p.price - p.discount;
      return sum + priceAfterDiscount * p.quantity;
    }, 0);

    this.status = "Pending"; // default
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  toPlainObject() {
    return { ...this };
  }
}

module.exports = Order;
