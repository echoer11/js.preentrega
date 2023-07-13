// Productos Y creacion de cards

const productContainer = document.getElementById("productContainer");
let watchModels;

// Función Asíncrona

const getWatchModels = async () => {
  const response = await fetch("products.json");
  watchModels = await response.json();

  for (const watch of watchModels) {
    const card = document.createElement("div");
    card.classList.add("col-lg-3", "col-md-4", "col-sm-12");
    card.innerHTML = `<div class="card" id="cardelli">
    <img src="${watch.image}" class="card-img-top" alt="${watch.brand} ${watch.model}" onclick="openImageWindow('${watch.image}')"> <hr>
        <div class="card-body">
          <h5 class="card-title">${watch.brand}</h5>
          <p class="card-model">${watch.model}</p>
          <p class="card-price">$${watch.price}</p>
          <button class="btn btn-outline-secondary btn-sm" onclick="addToCart(${watch.id})">Add to Cart</button>
        </div>
      </div>`;
    productContainer.appendChild(card);
  }
};
getWatchModels();

function openImageWindow(imageUrl) {
  window.open(imageUrl, "_blank", "width=500,height=500");
}

// Array del carrito

let shoppingCart = [];

const updateStorage = () => {
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
    getTotalPrice();
    showToast(`${product.brand} ${product.model} Added to Cart`);
  }
}

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
    getTotalPrice();
  }
}
function removeFromCart(productId) {
  const existingProduct = shoppingCart.find((item) => item.id === productId);
  if (existingProduct) {
    const index = shoppingCart.indexOf(existingProduct);
    shoppingCart.splice(index, 1);
    updateStorage();
    cartUpdate();
    getTotalPrice();
  }
}

// Calcular el precio total

function getTotalPrice() {
  let totalPrice = 0;
  for (const product of shoppingCart) {
    totalPrice += product.price * product.quantity;
  }

  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.innerHTML = `$${totalPrice}`;
}

// Dibujar el carrito
function cartUpdate() {
  const cartContainer = document.getElementById("cartContainer");

  cartContainer.innerHTML = "";
  for (const product of shoppingCart) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `<div class="cartCard card mb-2">
        <div class="row g-0">
          <div class=" image-cart col-sm-4">
            <img src="${product.image}" class="card-img-top"  alt="${product.brand} ${product.model}">
          </div>
          <div class="col-sm-5">
            <div class="card-body d-flex flex-column justify-content-between h-100">
              <div class="primer-columna">
                <h5 class="card-title">${product.brand}</h5>
                <p class="card-model">${product.model}</p>
                <p class="card-price">
                  $${product.price * product.quantity}</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3 button-group">
          <div class="d-flex flex-column justify-content-between">
            <div class="paddingBotones d-flex">
                  <button class="btn btn-outline-secondary btn-sm" onclick="reduceQuantity(${product.id})"> - </button>
                  <span>${product.quantity}</span>
                  <button class="btn btn-outline-secondary btn-sm" onclick="addToCart(${product.id})"> + </button>
            </div>
            <div class="d-flex paddingRemove">
                <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
            </div>
          </div>
        </div>
      </div>`;
    cartContainer.appendChild(cartItem);
  }
}

// Visualizar el carrito (offcanvas)

const cartIcon = document.getElementById("cartito");
const offCanvasCart = document.getElementById("offCanvasCart");
const emptyCart = document.getElementById("emptyCart");

cartIcon.addEventListener("click", function () {
  if (shoppingCart.length === 0) {
    emptyCart.classList.toggle("show");
    setTimeout(() => {
      emptyCart.classList.remove("show");
    }, 2000);
  } else {
    offCanvasCart.classList.toggle("show");
  }
});

offCanvasCart.querySelector(".btn-close").addEventListener("click", function () {
  offCanvasCart.classList.remove("show");
});

emptyCart.querySelector(".btn-close").addEventListener("click", function () {
  emptyCart.classList.remove("show");
});

// End Shopping / Limpiar elementos del carrito

const endShoppingButton = document.getElementById("endShopping");

endShoppingButton.addEventListener("click", function () {
  shoppingCart = [];
  updateStorage();
  cartUpdate();
  getTotalPrice();
  offCanvasCart.classList.remove("show");
  endToast(`Thanks for shopping with us!`);
});

// Funciones Toastify
function showToast(message) {
  Toastify({
    text: message,
    duration: 1000,
    gravity: "top",
    backgroundColor: "#272727",
    offset: {
      y: 50,
    },
  }).showToast();
}

function endToast(message) {
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    backgroundColor: "#272727",
    offset: {
      y: 50,
    },
  }).showToast();
}
