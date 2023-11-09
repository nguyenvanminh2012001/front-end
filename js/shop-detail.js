var getProductByIdApi = "http://localhost:8088/api/v1/user/product";
var getImageProductRecomendApi = "http://localhost:8088/api/v1/user/product/related";
function start() {
    getProducts(renderProducts);
}

start();

// Functions
async function getProducts(callback) {
    let productId = localStorage.getItem("product_id");
    await fetch(getProductByIdApi + "/" + productId)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
    const listProductRelated = await fetch(getImageProductRecomendApi + "/" + productId).then(response =>
        response.json())
    renderProductRelated(listProductRelated)
}
function renderProductRelated(listProductRelated) {
    var display__Product__Related = document.querySelector(".display__Product__Related")
    var html = listProductRelated.map((product) =>
        `<div class="col-lg-3 col-md-4 col-sm-6">
                            <div class="product__item">
                            <div
                                class="product__item__pic set-bg"
                                data-setbg="img/product/discount/cat2.jpg"
                                style="color:red"
                            >
                                <img src="${product.product_image_entity.image1}">
                                <ul class="product__item__pic__hover">
                                <li>
                                    <a href="#"><i class="fa fa-heart"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fa fa-retweet"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fa fa-shopping-cart"></i></a>
                                </li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a onclick = "handleSaveIdProduct(${product.id})" href="#">${product.name}</a></h6>
                                <h5>$${product.price}</h5>
                            </div>
                            </div>
                        </div>`
    )
    display__Product__Related.innerHTML = html.join("")
}
function renderProducts(product) {
    var productDetailBlock = document.querySelector("#product-detail-block");
    var htmls = `
        <div class  ="container">
        <div class="row">
            <div class="col-lg-6 col-md-6">
                <div class="product__details__pic">
                    <div class="product__details__pic__item">
                        <img class="product__details__pic__item--large img-border"
                            src="${product.product_image_entity.image1}" alt="">             <!--product-image-1 (img/product/details/product-details-1.jpg)-->
                    </div>
                    <div class="product__details__pic__slider owl-carousel">
                        <img data-imgbigurl="img/product/details/cat1.jpg"
                            src="img/product/details/cat1.jpg" alt="">                       <!--product-image-1-->
                        <img data-imgbigurl="img/product/details/cat2.jpg"
                            src="img/product/details/cat2" alt="">                       <!--product-image-2-->
                        <img data-imgbigurl="img/product/details/cat3.jpg"
                            src="img/product/details/cat3.jpg" alt="">                       <!--product-image-3-->
                        <img data-imgbigurl="img/product/details/dog1.jpg"
                            src="img/product/details/dog1.jpg" alt="">                       <!--product-image-4-->
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6" data-id=${product.id}>                             <!--product-detail-->
                <div class="product__details__text">
                    <h3>${product.name}</h3>                            <!--product name-->
                    <div class="product__details__rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <span>(18 reviews)</span>
                    </div>
                    <div class="product__details__price">$${product.price}</div>            <!--product-price-->
                    <p>${product.description}<br>
                    Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet
                        quam vehicula elementum sed sit amet dui. Proin eget tortor risus.</p>             <!--product-descirption-->
                    <div class="product__details__quantity">
                        <div class="quantity">
                            <div class="pro-qty">
                                <input type="text" value="1">
                            </div>
                        </div>
                    </div>
                    <button class="primary-btn" onclick = "handleAddToCart(${product.id})">ADD TO CARD</button>
                    <a href="#" class="heart-icon"><span class="icon_heart_alt"></span></a>
                    <ul>
                        <li><b>Availability</b> <span>In Stock</span></li>
                        <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                        <li><b>Weight</b> <span>0.5 kg</span></li>
                        <li><b>Share on</b>
                            <div class="share">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                <a href="#"><i class="fa fa-pinterest"></i></a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="product__details__tab">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                                aria-selected="true">Description</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                                aria-selected="false">Information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                                aria-selected="false">Reviews <span>(1)</span></a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="product__details__tab__desc">
                                <h6>Products Infomation</h6>
                                <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus
                                    suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam
                                    vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada.
                                    Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat,
                                    accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a
                                    pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula
                                    elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus
                                    et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                                    vel, ullamcorper sit amet ligula. Proin eget tortor risus.</p>
                                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem
                                    ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet
                                    elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum
                                    porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus
                                    nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                                    Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed
                                    porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum
                                    sed sit amet dui. Proin eget tortor risus.</p>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-2" role="tabpanel">
                            <div class="product__details__tab__desc">
                                <h6>Products Infomation</h6>
                                <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                    Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                    sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                    eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                    Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                    sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                    diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                    ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                    Proin eget tortor risus.</p>
                                <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem
                                    ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet
                                    elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum
                                    porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus
                                    nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabs-3" role="tabpanel">
                            <div class="product__details__tab__desc">
                                <h6>Products Infomation</h6>
                                <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                    Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                    Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                    sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                    eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                    Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                    sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                    diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                    ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                    Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                    Proin eget tortor risus.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    productDetailBlock.innerHTML = htmls;
}

function handleAddToCart(productId) {
    let userId = localStorage.getItem('user_id');
    let token = "Bearer " + localStorage.getItem('token')
    if (userId == null) {
        window.location.href = "login.html";
    }
    else {
        let addToCartApi = 'http://localhost:8088/api/cart';
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },

        };

        fetch(addToCartApi + '/' + userId + '?product_id=' + productId, options)
            .then(function (response) {
                let status = response.status;
                if (status <= 299 && status >= 200) {
                    // 200–299
                    alert("Thêm sản phẩm vào giỏ hàng thành công!");
                } else {
                    alert("Sản phẩm đã có trong giỏ hàng!");
                }
            })
            .catch(function () {
                alert("ngủ");
            });
    }
}