// Array de productos de la tienda
const watchModels = [
  { 
    id: 1, 
    brand: "Rolex", 
    model: "Submariner", 
    price: 14000,
    image: "./assets/rolex01.png",
  },

  { 
    id:2,
    brand: "Rolex", 
    model: "Sea-Dweller", 
    price: 12000,
    image: "./assets/rolex01.png", 
  },

  { id:3,
    brand: "Rolex", 
    model: "Daytona", 
    price: 10000,
    image: "./assets/rolex01.png", 
  },

  { id:4,
    brand: "Casio", 
    model: "GM-B2100", 
    price: 200,
    image: "./assets/rolex01.png", 
  },

  { id:5,
    brand: "Casio", 
    model: "GSW-H1000", 
    price: 300,
    image: "./assets/rolex01.png", 
  },

  { id:6,
    brand: "Casio", 
    model: "MTG-B2000PH", 
    price: 3200,
    image: "./assets/rolex01.png", 
  },

  { id:7,
    brand: "Seiko", 
    model: "Presage", 
    price: 1100,
    image: "./assets/rolex01.png", 
  },

  { id:8,
    brand: "Seiko", 
    model: "Prospex", 
    price: 2800,
    image: "./assets/rolex01.png", 
  },
  
  { id:9,
    brand: "Seiko", 
    model: "5 Sports", 
    price: 1500,
    image: "./assets/rolex01.png", 
  },
  { id:10,
    brand: "Seiko", 
    model: "5 Sports", 
    price: 1500,
    image: "./assets/rolex01.png", 
  },
  { id:11,
    brand: "Seiko", 
    model: "5 Sports", 
    price: 1500,
    image: "./assets/rolex01.png", 
  },
  { id:12,
    brand: "Seiko", 
    model: "5 Sports", 
    price: 1500,
    image: "./assets/rolex01.png", 
  },
];

// Productos Y creacion de cards
const productContainer = document.getElementById('productContainer');

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
      <a href="#" class="btn btn-primary" onclick="addToCart(${watch.id})">Add to Cart</a>
    </div>
  </div>`;
  productContainer.appendChild(card);
};


// Array del carrito 

let shoppingCart = [];

const updateStorage= (shoppingCart)=>{
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
      <div class="cartCard">
        <img src="${product.image}" class="card-img-top" alt="${product.brand} ${product.model}">
        <div class="card-body">
          <h5 class="card-title">${product.brand}</h5>
          <p class="card-model">${product.model}</p>
          <p class="card-price"><strong>$${product.price}</strong></p>
          <div class="quantity">
            <button class="btn btn-sm btn-secondary" onclick="reduceQuantity(${product.id})">-</button>
            <span>${product.quantity}</span>
            <button class="btn btn-sm btn-secondary" onclick="addToCart(${product.id})">+</button>
          </div>
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  }
}


