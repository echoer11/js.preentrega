// // Array de productos de la tienda
// const watchModels = [
//   { 
//     id: 1, 
//     brand: "Rolex", 
//     model: "Submariner", 
//     price: 14000,
//     image: "./assets/rolex01.png",
//   },

//   { 
//     id:2,
//     brand: "Rolex", 
//     model: "Sea-Dweller", 
//     price: 12000,
//     image: "./assets/rolex01.png", 
//   },

//   { id:3,
//     brand: "Rolex", 
//     model: "Daytona", 
//     price: 10000,
//     image: "./assets/rolex01.png", 
//   },

//   { id:4,
//     brand: "Casio", 
//     model: "GM-B2100", 
//     price: 200,
//     image: "./assets/rolex01.png", 
//   },

//   { id:5,
//     brand: "Casio", 
//     model: "GSW-H1000", 
//     price: 300,
//     image: "./assets/rolex01.png", 
//   },

//   { id:6,
//     brand: "Casio", 
//     model: "MTG-B2000PH", 
//     price: 3200,
//     image: "./assets/rolex01.png", 
//   },

//   { id:7,
//     brand: "Seiko", 
//     model: "Presage", 
//     price: 1100,
//     image: "./assets/rolex01.png", 
//   },

//   { id:8,
//     brand: "Seiko", 
//     model: "Prospex", 
//     price: 2800,
//     image: "./assets/rolex01.png", 
//   },
  
//   { id:9,
//     brand: "Seiko", 
//     model: "5 Sports", 
//     price: 1500,
//     image: "./assets/rolex01.png", 
//   },
//   { id:10,
//     brand: "Seiko", 
//     model: "5 Sports", 
//     price: 1500,
//     image: "./assets/rolex01.png", 
//   },
//   { id:11,
//     brand: "Seiko", 
//     model: "5 Sports", 
//     price: 1500,
//     image: "./assets/rolex01.png", 
//   },
//   { id:12,
//     brand: "Seiko", 
//     model: "5 Sports", 
//     price: 1500,
//     image: "./assets/rolex01.png", 
//   },
// ];

// Productos Y creacion de cards
const productContainer = document.getElementById('productContainer');
let watchModels;
// Función Asíncrona
const getWatchModels = async () => {
  const response = await fetch('products.json');
  watchModels = await response.json();

  for (const watch of watchModels) {
    const card = document.createElement('div');
    card.classList.add('col-lg-3', 'col-md-4', 'col-sm-12');
    card.innerHTML =
      `<div class="card">
        <img src="${watch.image}" class="card-img-top" alt="${watch.brand} ${watch.model}">
        <div class="card-body">
          <h5 class="card-title">${watch.brand}</h5>
          <p class="card-model">${watch.model}</p>
          <p class="card-price"><strong>$${watch.price}</strong></p>
          <button class="btn btn-primary" onclick="addToCart(${watch.id})">Add to Cart</button>
        </div>
      </div>`;
    productContainer.appendChild(card);
  }
};
getWatchModels();


// Array del carrito 

let shoppingCart = [];

const updateStorage= ()=>{
  localStorage.setItem("Shopping Cart", JSON.stringify(shoppingCart));
  };

// Añadir los productos al carrito
function addToCart(productId) {
  const product = watchModels.find((watch) => watch.id === productId);
  if (product) {
    const existingProduct = shoppingCart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      shoppingCart.push(product);
      product.quantity = 1;
    }
    updateStorage();
    cartUpdate();
    showToast(`${product.brand} ${product.model} Added to Cart`);
    console.log (shoppingCart,product.quantity)
  }
};

// Sacar productos del carrito
function reduceQuantity(productId) {
  const existingProduct = shoppingCart.find((item) => item.id === productId);
  if (existingProduct) {
    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
    } else {
      const index = shoppingCart.indexOf(existingProduct);
      shoppingCart.splice(index, 1);
    }
    updateStorage();
    cartUpdate();
  }
}
function removeFromCart(productId) {
  const existingProduct = shoppingCart.find((item) => item.id === productId);
  if (existingProduct) {
    const index = shoppingCart.indexOf(existingProduct);
    shoppingCart.splice(index, 1);
    updateStorage();
    cartUpdate();
  }
}

// Dibujar el carrito
function cartUpdate() {
  const cartContainer = document.getElementById('cartContainer');
 
  cartContainer.innerHTML = '';
  for (const product of shoppingCart) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
    <div class="cartCard card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.image}" class="card-img-top" style="max-height: 150px; width: auto;" alt="${product.brand} ${product.model}" />
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column justify-content-between h-100">
              <div>
                <h5 class="card-title">${product.brand}</h5>
                <p class="card-model">${product.model}</p>
                <p class="card-price">
                  <strong>$${product.price * product.quantity}</strong>
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <button class="btn btn-sm btn-secondary" onclick="reduceQuantity(${product.id})">-</button>
                  <span>${product.quantity}</span>
                  <button class="btn btn-sm btn-secondary" onclick="addToCart(${product.id})">+</button>
                </div>
                <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart(${product.id})">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  }
}

// Visualizar el carrito (offcanvas)
const cartIcon = document.getElementById('cartito');
const offCanvasCart = document.getElementById('offCanvasCart');

cartIcon.addEventListener('click', function() {
  offCanvasCart.classList.toggle('show');
});
offCanvasCart.querySelector('.btn-close').addEventListener('click', function() {
  offCanvasCart.classList.remove('show');
});

// Función Toastify
function showToast(message) {
  Toastify({
    text: message,
    duration: 2000, 
    gravity: 'top', 
    backgroundColor: '#272727', 
    offset:{
      y:50,
    }
  })
  .showToast();
}







