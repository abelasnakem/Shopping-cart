const readline = require('readline');
const ShopCartService = require('./shopCartService');

const cart = new ShopCartService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(`
1. Add Item
2. Remove Item
3. View Cart
4. Get Item Quantity
5. Clear Cart
6. Exit
`);
}

function handleInput() {
  showMenu();
  rl.question('Choose an option: ', async (option) => {
    switch (option.trim()) {
      case '1':
        rl.question('Enter product ID: ', (id) => {
          rl.question('Enter quantity to add: ', (qty) => {
            try {
              cart.addItem(id, parseInt(qty));
              console.log('Item added!');
            } catch (e) {
              console.log(e.message);
            }
            handleInput();
          });
        });
        break;

      case '2':
        rl.question('Enter product ID: ', (id) => {
          rl.question('Enter quantity to remove: ', (qty) => {
            try {
              cart.removeItem(id, parseInt(qty));
              console.log('Item removed!');
            } catch (e) {
              console.log(e.message);
            }
            handleInput();
          });
        });
        break;

      case '3':
        console.log('Current Cart:', cart.getCart());
        handleInput();
        break;

      case '4':
        rl.question('Enter product ID: ', (id) => {
          console.log(`Quantity of ${id}:`, cart.getItemQuantity(id));
          handleInput();
        });
        break;

      case '5':
        cart.clearCart();
        console.log('Cart cleared.');
        handleInput();
        break;

      case '6':
        rl.close();
        break;

      default:
        console.log('Invalid option.');
        handleInput();
    }
  });
}

handleInput();
