var getAllProductApi = "http://localhost:8088/api/v1/user/product";
var getProductRecommendApi = "http://localhost:8088/api/v1/user/product/recommend";

function start() {
  getProducts(renderProducts);
  // getProductRecommends(renderProductRecommends);  
}

start();

// Functions
function getProducts(callback) {
  fetch(getAllProductApi)
    .then(function (response) {
      return response.json();
    })
    .then(callback);
}

function renderProducts(products) {
  var mainShopBlock = document.querySelector("#main-shop");
  var htmls = products.map(function (product) {
    if (product.category == "Hạt") product.category = "oranges";
    if (product.category == "Pate") product.category = "fresh-meat";
    if (product.category == "Cát") product.category = "Pets";
    if (product.category == "Quần Áo") product.category = "fastfood";
    return `
            <div data-id="${product.id}" class="col-lg-3 col-md-4 col-sm-6 mix ${product.category}">              <!-- category -->
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="">
                            <img class="img-border" src="${product.product_image_entity.image1}"> </img>                        <!-- img -->
                            <ul class="featured__item__pic__hover">
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6 onclick="handleSaveIdProduct(${product.id})"><a href="#">${product.name}</a></h6>           <!-- name -->
                            <h5>$${product.price}</h5>                                       <!-- price -->
                        </div>
                    </div>
                </div>
        `;
  });
  mainShopBlock.innerHTML = htmls.join("");
}

var listImage = []
var nameProduct = []
var idProduct = []
var getProductRecommendApi = "http://localhost:8088/api/v1/user/product/recommend";
var token = "Bearer ";
var image = ""
var display__image = document.querySelector(".display__image");
var next__prev = "";
var prev__slide = "";
var next__slide = "";
var width__Of__Image = 170;
var number__Of__Slide = 3
var number__Image__prev = 0;
var number__Image__next = 3;
var number__Image = 3;
var ind__First = 1;
var ind__Second = 1;
var ind__Third = 2;
const arrayInd = {
  0: "first",
  1: "second",
  2: "third",
  3: "four",
  4: "five"
}
async function showAvatar() {
  let userId = localStorage.getItem("user_id");
  let token = "Bearer " + localStorage.getItem("token");
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  // if (userId == null) {
  let productsTmp = await fetch(getAllProductApi, options).then(response => response.json())
  for (let i = 0; i < 10; i++) {
    listImage.push(productsTmp[i].product_image_entity.image1)
    nameProduct.push(productsTmp[i].name)
    idProduct.push(productsTmp[i].id)
  }

  ; (() => {
    var images = listImage.map((image, index) => {
      if (index < 5) {
        return `<div class="image ${arrayInd[index]}">
              <img src=${image} data-id="${index}" />
              <div class="textImage" onclick="handleSaveIdProduct(${idProduct[index]})">
                ${nameProduct[index]}
              </div>
            </div>`
      }
      return `<div class="image">
              <img src=${image} data-id="${index}" />
              <div class="textImage" onclick="handleSaveIdProduct(${idProduct[index]})">
                ${nameProduct[index]}
              </div>
            </div>`
    }).join('')
    display__image.innerHTML = images
  })()
  image = document.querySelectorAll(".image");
  next__prev = document.querySelector(".next__prev");
  prev__slide = document.querySelector("#prev__slide");
  next__slide = document.querySelector("#next__slide");
  width__Of__Image = 170;
  number__Of__Slide = 5
  number__Image__prev = 0;
  number__Image__next = image.length - 3;
  number__Image = image.length;
  ind__First = 1;
}


async function handleSilde() {
  await showAvatar();
  function handlePrevSlide(event) {
    if (ind__First > 0) {
      ind__First = ind__First - 1;
    }
    else {
      ind__First = number__Image - 1
    }
    for (let i = 0; i < number__Of__Slide; i++) {
      image[ind__First - 1 + i < 0 ? (number__Image - Math.abs(ind__First - 1 + i)) : (ind__First - 1 + i >= number__Image ? (ind__First - 1 + i - number__Image) : (ind__First - 1 + i))].classList.add(arrayInd[i])
      image[ind__First + i >= number__Image ? (ind__First + i - number__Image) : ind__First + i].classList.remove(arrayInd[i])
    }
  };

  function handleNextSlide(event) {
    if (ind__First < number__Image) {
      ind__First = ind__First + 1;
    }
    else {
      ind__First = 1
    }
    for (let i = 0; i < number__Of__Slide; i++) {
      image[ind__First - 1 + i >= number__Image ? (ind__First - 1 + i - number__Image) : ind__First - 1 + i].classList.add(arrayInd[i])
      image[ind__First - 2 + i >= 0 ? (ind__First - 2 + i >= number__Image ? ind__First - 2 + i - number__Image : ind__First - 2 + i) : (number__Image - 1)].classList.remove(arrayInd[i])
    }
  };
  prev__slide.addEventListener("click", () => {
    handlePrevSlide()
  })
  next__slide.addEventListener("click", () => {
    handleNextSlide()
  })

}
handleSilde()




