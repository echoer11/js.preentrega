// Funcion seleccionar nivel de membresía:

function membership(){
let customerStatus = prompt("Please type your membership status:\nBronze \nSilver \nGold");
let discount = 0;
if (customerStatus === "Gold") {
  discount = 20;
} else if (customerStatus === "Silver") {
  discount = 10;
} else if (customerStatus === "Bronze") {
  discount = 5;
} else {
  console.log("You are not a member.");
}
console.log("Your discount is " + discount + "% off!");
let finalResult = 100 - discount;
return finalResult;
}

let casioGshock = 80000;
let seikoProspex = 110000;
let rolexSubmariner = 950000;

let discountApplied = membership();

// Funcion para elegir producto y aplicar descuento

function addingProduct() {
    let price = 0;
    let chooseProduct;
  
    while (true) {
      chooseProduct = parseInt(prompt("Which watch would you like? \n1. Casio G-Shock \n2. Seiko Prospex \n3. Rolex Submariner"));
      
      if (chooseProduct === 1) {
        price = discountApplied * casioGshock / 100;
        break;
      } else if (chooseProduct === 2) {
        price = discountApplied * seikoProspex / 100;
        break;
      } else if (chooseProduct === 3) {
        price = discountApplied * rolexSubmariner /100;
        break;
      } else {
        alert("Choose a valid product");
      }
    }
    
    alert("The price for your chosen product is " + price + ".-");
    console.log("The price for your chosen product is " + price + ".-")
  }

addingProduct();


