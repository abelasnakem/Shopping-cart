const ShopCartService = require('./shopCartService');

describe('ShopCartService', () => {
  let cart;

  beforeEach(() => {
    cart = new ShopCartService();
  });

  test('adds new items', () => {
    cart.addItem('apple', 2);
    expect(cart.getItemQuantity('apple')).toBe(2);
  });

  test('adds to existing item', () => {
    cart.addItem('banana', 1);
    cart.addItem('banana', 2);
    expect(cart.getItemQuantity('banana')).toBe(3);
  });

  test('removes item quantity', () => {
    cart.addItem('milk', 3); //arrange
    cart.removeItem('milk', 1);  //act
    expect(cart.getItemQuantity('milk')).toBe(2); //expectation (assertion)
  });

  test('removes item completely when quantity hits 0', () => {
    cart.addItem('bread', 1);
    cart.removeItem('bread', 1);
    expect(cart.getItemQuantity('bread')).toBe(0);
    expect(cart.getCart()).not.toHaveProperty('bread');
  });

  test('throws error when removing item not in cart', () => {
    expect(() => cart.removeItem('soap')).toThrow("Item not in cart");
  });

  test('throws error on invalid quantity', () => {
    expect(() => cart.addItem('sugar', 0)).toThrow("Quantity must be positive");
    expect(() => cart.removeItem('sugar', -2)).toThrow("Quantity must be positive");
  });

  test('clears the cart', () => {
    cart.addItem('egg', 5);
    cart.clearCart();
    expect(cart.getCart()).toEqual({});
  });
});
