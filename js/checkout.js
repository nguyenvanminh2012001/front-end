var getCartApi = "http://localhost:8088/api/cart";
var orderApi = "http://localhost:8088/api/order";
var total = 0;
function start() {
  getCart(renderCart);
}

start();

// Functions
function getCart(callback) {
  let userId = localStorage.getItem("user_id");
  let token = "Bearer " + localStorage.getItem("token");
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  fetch(getCartApi + "/" + userId, options)
    .then(function (response) {
      //   console.log(response.json());
      return response.json();
    })
    .then(callback);
}

function renderCart(productCartModels) {
  var cartBlock = document.querySelector("#cart-product-block");
  var htmls = productCartModels.map(function (productCartModel) {
    total = total + productCartModel.total;
    let subTotalBlock = document.querySelector("#subTotal");
    subTotalBlock.innerHTML = "$" + total;
    let totalBlock = document.querySelector("#total");
    totalBlock.innerHTML = "$" + total;
    return `
        <li>${productCartModel.name} <span>${productCartModel.quantity} x $${productCartModel.price}</span></li>
        `;
  });
  cartBlock.innerHTML = htmls.join("");
}

var checkoutBtn = document.querySelector("#btn-checkout");
checkoutBtn.onclick = function () {
  let firstname = document.querySelector('input[name="firstname"]').value;
  let lastname = document.querySelector('input[name="lastname"]').value;
  let address = document.querySelector('input[name="address"]').value;
  let city = document.querySelector('input[name="city"]').value;
  let country = document.querySelector('input[name="country"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  let email = document.querySelector('input[name="email"]').value;

  var formData = {
    firstName: firstname,
    lastName: lastname,
    address: address,
    city: city,
    country: country,
    phone: phone,
    email: email,
  };
  order(formData);
};

function order(data) {
  let userId = localStorage.getItem("user_id");
  let token = "Bearer " + localStorage.getItem("token");
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  fetch(orderApi + "/" + userId, options)
    .then(function (response) {
      //   console.log(response.json());
      return response.json();
    })
    .then(callback);
}
