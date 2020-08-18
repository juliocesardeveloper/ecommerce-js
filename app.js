// variables
const cartBtn = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// cart
let cart = [];
// buttons
let buttonsDOM = [];

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch('union_store_products.json')
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const {product_name, product_price} = item;
        const {product_id} = item;
        const {product_image} = item;
        return {product_name, product_price, product_id, product_image}
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      result += `
      <!-- single product -->
      <article class="product">
        <div class="img-container">
          <img src=${product.product_image} alt="product" class="product-img">
          <button class="bag-btn" data-id=${product.product_id}>
            <i class="fas fa-shopping-cart"></i>
            Agregar al carro
          </button>
        </div>
        <h3>${product.product_name}</h3>
        <h4>${product.product_price}</h4>
      </article>
      <!-- end of single product -->
      `;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.product_id;
      let inCart = cart.find(item => item.id === id);
      if(inCart) {
        button.innerText = "En el carro";
        button.disabled = true
      } else {
        button.addEventListener('click', event => {
          event.target.innerText = "En el carro";
          event.target.disabled = true;
          // get product from products
          let cartItem = Storage.getProduct(id);
          console.log(cartItem);
          // add product to the cart
          
          // save cart in local storage
          // set cart values
          // display cart item
          // show the cart
        })
      }
    });
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id === id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(() => {
    ui.getBagButtons();
  });
});