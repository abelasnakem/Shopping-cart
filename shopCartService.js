class ShopCartService {
  constructor() {
    this.cart = {};
  }

  addItem(productId, quantity = 1) {
    if (quantity <= 0) throw new Error("Quantity must be positive");

    if (!this.cart[productId]) {
      this.cart[productId] = 0;
    }
    this.cart[productId] += quantity;
  }

  removeItem(productId, quantity = 1) {
    if (quantity <= 0) throw new Error("Quantity must be positive");

    if (!this.cart[productId]) {
      throw new Error("Item not in cart");
    }

    this.cart[productId] -= quantity;

    if (this.cart[productId] <= 0) {
      delete this.cart[productId];
    }
  }

  getItemQuantity(productId) {
    return this.cart[productId] || 0;
  }

  getCart() {
    return { ...this.cart };
  }

  clearCart() {
    this.cart = {};
  }
}

module.exports = ShopCartService;
