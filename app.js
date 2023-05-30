// // Funcion seleccionar nivel de membresía:

// function membership(){
// let customerStatus = prompt("Please type your membership status:\nBronze \nSilver \nGold");
// let discount = 0;
// if (customerStatus === "Gold") {
//   discount = 20;
// } else if (customerStatus === "Silver") {
//   discount = 10;
// } else if (customerStatus === "Bronze") {
//   discount = 5;
// } else {
//   console.log("You are not a member.");
// }
// console.log("Your discount is " + discount + "% off!");
// let finalResult = 100 - discount;
// return finalResult;
// }

// let casioGshock = 80000;
// let seikoProspex = 110000;
// let rolexSubmariner = 950000;

// let discountApplied = membership();

// // Funcion para elegir producto y aplicar descuento

// function addingProduct() {
//     let price = 0;
//     let chooseProduct;

//     while (true) {
//       chooseProduct = parseInt(prompt("Which watch would you like? \n1. Casio G-Shock \n2. Seiko Prospex \n3. Rolex Submariner"));

//       if (chooseProduct === 1) {
//         price = discountApplied * casioGshock / 100;
//         break;
//       } else if (chooseProduct === 2) {
//         price = discountApplied * seikoProspex / 100;
//         break;
//       } else if (chooseProduct === 3) {
//         price = discountApplied * rolexSubmariner /100;
//         break;
//       } else {
//         alert("Choose a valid product");
//       }
//     }

//     alert("The price for your chosen product is " + price + ".-");
//     console.log("The price for your chosen product is " + price + ".-")
//   }

// addingProduct();

// Clase de producto en la tienda
class Watch {
  constructor(brand, model, price) {
    this.brand = brand;
    this.model = model;
    this.price = price;
  }
}

// Array de productos de la tienda
const watchModels = [
  { brand: "Rolex", model: "Submariner", price: 14000 },
  { brand: "Rolex", model: "Sea-Dweller", price: 12000 },
  { brand: "Rolex", model: "Daytona", price: 10000 },
  { brand: "Casio", model: "GM-B2100", price: 200 },
  { brand: "Casio", model: "GSW-H1000", price: 300 },
  { brand: "Casio", model: "MTG-B2000PH", price: 3200 },
  { brand: "Seiko", model: "Presage", price: 1100 },
  { brand: "Seiko", model: "Prospex", price: 2800 },
  { brand: "Seiko", model: "5 Sports", price: 1500 },
];

// Array del carrito de compra
const shoppingCart = [];

// Función para elegir la marca por prompt
function chooseBrand() {
  while (true) {
    let brand = prompt("Enter the brand of the watch (Rolex, Casio, Seiko):");
    if (brand) {
      brand = brand.toLowerCase();
      if (watchModels.some((item) => item.brand.toLowerCase() === brand)) {
        return brand;
      }
    }
    alert("Invalid brand. Please enter a valid brand.");
  }
}

// Función para elegir el modelo por prompt
function chooseModel(brand) {
  let models = watchModels.filter(
    (item) => item.brand.toLowerCase() === brand.toLowerCase()
  );
  let modelOptions = models.map((item) => item.model).join(", ");
  let model = prompt(`Select a model (${modelOptions}):`);
  return model;
}

// Función para crear el producto y agregarlo al carrito
function createWatch() {
  let brand = chooseBrand();
  let model = chooseModel(brand);

  let selectedWatch = watchModels.find(
    (item) => item.brand.toLowerCase() === brand && item.model === model
  );
  if (selectedWatch) {
    let newWatch = new Watch(
      selectedWatch.brand,
      selectedWatch.model,
      selectedWatch.price
    );
    console.log("New Watch:", newWatch);
    shoppingCart.push(newWatch);
    console.log(shoppingCart);
  } else {
    console.log("Invalid brand or model selected.");
  }
}

// Función para terminar la compra y calcular el costo
function completeShopping() {
  alert(
    `You have added ${shoppingCart.length} product(s) to the shopping cart.`
  );
  let totalCost = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    totalCost += shoppingCart[i].price;
  }
  alert(`The total cost of your purchase is $${totalCost}.`);

  let clearCartAnswer = prompt(
    "Do you want to cancel and clear the shopping cart? (yes/no)"
  );
  if (clearCartAnswer.toLowerCase() === "yes") {
    shoppingCart.length = 0;
    console.log("The shopping cart has been cleared.");
  }
}

// Función global del proceso de compra
function watchSelection() {
  let continueSelection = true;
  while (continueSelection) {
    createWatch();
    let shouldContinue = prompt(
      "Do you want to select another watch? (yes/no)"
    );
    if (shouldContinue.toLowerCase() !== "yes") {
      continueSelection = false;
      completeShopping();
    }
  }
}

watchSelection();
