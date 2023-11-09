var getProductByCategoryApi =
  "http://localhost:8088/api/v1/user/product/filter?category_id=";

var getProductByKeyWordApi = "http://localhost:8088/api/v1/user/product/search?keyword=";

function start() {
  let keyWord = localStorage.getItem("keyWord");
  if (keyWord == null) {
    getProducts(renderProducts);
  }
  else {
    getProductByKeyWord(renderProducts);
    localStorage.removeItem("keyWord");
  }
}

start();

// Functions
function getProductByKeyWord(callback) {
  let keyWord = localStorage.getItem("keyWord");
  fetch(getProductByKeyWordApi + keyWord)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

// Functions
function getProducts(callback) {
  let categoryId = localStorage.getItem("category_id");
  fetch(getProductByCategoryApi + categoryId)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderProducts(products) {
  let mainShopBlock = document.querySelector("#main-shop");
  var htmls = products.map(function (product) {
    return `
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="product__item">
                    <div class="product__item__pic set-bg" data-setbg="">       <!-- image -->
                    <img class="img-border" src="${product.product_image_entity.image1}"> </img>    
                    <ul class="product__item__pic__hover">
                            <li><a href="#"><i class="fa fa-heart"></i></a></li>
                            <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                            <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                        </ul>
                    </div>
                    <div class="product__item__text">
                        <h6 onclick="handleSaveIdProduct(${product.id})"><a ) href="#">${product.name}</a></h6>                                 <!-- name -->
                        <h5>$${product.price}</h5>                                                 <!-- price -->
                    </div>
                </div>
            </div>
          `;
  });
  mainShopBlock.innerHTML = htmls.join("");
}
