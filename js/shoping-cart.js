var getCartApi = "http://localhost:8088/api/cart";
var deleteProductCartApi = "http://localhost:8088/api/cart";
var updateProductCartApi = "http://localhost:8088/api/cart";
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
  var cartBlock = document.querySelector("#cart-block");
  var htmls = productCartModels.map(function (productCartModel, index) {
    total = total + productCartModel.total;
    let subTotalBlock = document.querySelector("#subTotal");
    subTotalBlock.innerHTML = '$' + total;
    let totalBlock = document.querySelector("#total");
    totalBlock.innerHTML = '$' + total;
    return `
        <tr id="delete-product-${productCartModel.id}">
            <td class="shoping__cart__item">
                <img class="img-border" src="${productCartModel.image}" alt="">              <!--image-->
                <h5>${productCartModel.name}</h5>               <!--name-->
            </td>
            <td class="shoping__cart__price">
                $${productCartModel.price}                                              <!--price-->
            </td>
            <td class="shoping__cart__quantity">
                <div class="quantity">
                    <div class="pro-qty"> 
                    <span class="dec qtybtn" onclick="dec(${index}, ${productCartModel.id})">-</span>
                        <input name="inputquantity" type="text" value="${productCartModel.quantity}">        <!--quantity-->
                    <span class="inc qtybtn" onclick="inc(${index}, ${productCartModel.id})">+</span>     
                    </div>
                </div>
            </td>
            <td class="shoping__cart__total">
                $${productCartModel.total}                                             <!--total-->
            </td>
            <td class="shoping__cart__item__close">
                <span class="icon_close" onclick=deleteProduct(${productCartModel.id})></span>
            </td>
        </tr>
        `;
  });
  cartBlock.innerHTML = htmls.join("");
}
function dec(index, productId) {
  const inputDec = document.querySelectorAll('input[name="inputquantity"')[
    index
  ].value;
  if (inputDec > 0) {
    document.querySelectorAll('input[name="inputquantity"]')[index].value =
      inputDec - 1;
    let feature = "dec";
    handleUpdateQuantity(feature, productId);
  }
}

function inc(index, productId) {
  const inputDec = document.querySelectorAll('input[name="inputquantity"')[
    index
  ].value;
  if (inputDec > 0) {
    document.querySelectorAll('input[name="inputquantity"]')[index].value =
      inputDec - 1 + 2;
    let feature = "inc";
    handleUpdateQuantity(feature, productId);
    let quantity = document.querySelectorAll('input[name="inputquantity"]')[index].value;
  }
}

function handleUpdateQuantity(feature, productId) {
  let userId = localStorage.getItem("user_id");
  let token = "Bearer " + localStorage.getItem("token");
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  fetch(
    updateProductCartApi +
    "/" +
    userId +
    "?product_id=" +
    productId +
    "&feature=" +
    feature,
    options
  )
    .then(function (response) {
      response.json();
    })
    .catch(function () {
      alert("ngủ");
    });
}

function deleteProduct(productId) {
  let userId = localStorage.getItem("user_id");
  let token = "Bearer " + localStorage.getItem("token");
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  fetch(
    deleteProductCartApi + "/" + userId + "?product_id=" + productId,
    options
  )
    .then(function (response) {
      response.json();
    })
    .then(function () {
      let productBlock = document.querySelector("#delete-product-" + productId);
      productBlock.remove();
    });
}

