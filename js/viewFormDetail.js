const listBillOrder = document.querySelector(".listBillOrder");
const viewDetail = document.querySelectorAll(".viewDetail");
const selectStatus = document.querySelectorAll(".selectStatus");
const getBillApi = "http://localhost:8088/api/order";
const listBillApi = [];
// const fakeBillDetail = [
//     {
//         id: 0,
//         name: "Cuong",
//         date: "8-10-2001",
//         listProduct: ["giay convert", "ao phong", "quan jean", "mu coi", "toc do"],
//         total: 2000000,
//         address: "Thanh Liem- Ha Nam",
//         status: "pending"
//     },
//     {
//         id: 1,
//         name: "Manh Cuong",
//         date: "23-8-2001",
//         listProduct: ["giay convert 2", "ao phong 2", "quan jean 2", "mu coi 2", "toc do 2"],
//         total: 2222222,
//         address: "Thanh Liem 2- Ha Nam",
//         status: "pending"
//     }
// ]
async function callApiListBill() {
  let token = "Bearer " + localStorage.getItem("token");
  let userId = localStorage.getItem("user_id");
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  let response = await fetch(getBillApi + "/" + userId, options);
  let bills = await response.json();
  const htmlBills = bills.map((bill, index) => {
    return `<div class="detailBillOrder" data-id="0">
          <div class="column__Bill amount__Price__Name">${bill.date}</div>
          <div class="column__Bill total__Money">${(
            Math.round(bill.total * 100) / 100
          ).toLocaleString()}$</div>
          <div class="column__Bill address">${bill.address}</div>
          <div class="column__Bill status">${bill.status}
          </div>
          <div class="column__Bill detail">
            <div class="viewDetail" onclick="toggleFormDetail(${index})">Xem chi tiết</div>
          </div>
        </div>
        `;
  });
  listBillOrder.innerHTML += htmlBills.join("");
}

callApiListBill();
async function callFormDetail(index) {
  let token = "Bearer " + localStorage.getItem("token");
  let userId = localStorage.getItem("user_id");
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  let response = await fetch(getBillApi + "/" + userId, options);
  let bills = await response.json();
  console.log(bills);
  var liProduct = bills[index].order_detail_model_list.map((product) => {
    return `
            <li class="nameProduct">${product.product_name} * ${product.price}$ * ${product.quantity}</li>
          `;
  });
  liProduct.join("");
  const htmls =
    `<div class="formDetail" tabindex="0">
      <p class="textFormDetail">Chi tiết hóa đơn</p>
      <div class="infoBill">
        <div class="dateBill">Ngày tạo hóa đơn: ${bills[index].date}</div>
        <div class="listProduct">
          <p>Danh sách sản phẩm đã đặt:</p><ul class="Products">` +
    liProduct.join("") +
    `</ul>
        </div >
        <div class="diaChi">Địa chỉ: ${bills[index].address}</div>
        <div class="tongTien">Tổng tiền:  ${(
          Math.round(bills[index].total * 100) / 100
        ).toLocaleString()}$</div>
      </div >
        <div class="btn__Confirm" >OK</div>
    </div > `;
  document.body.innerHTML += htmls;
}

async function toggleFormDetail(index) {
  var formDetail = document.querySelector(".formDetail");
  if (formDetail == null) {
    await callFormDetail(index);
    formDetail = document.querySelector(".formDetail");
    formDetail.classList.toggle("active");
    const btn__Confirm = document.querySelector(".btn__Confirm");
    btn__Confirm.addEventListener("click", () => {
      formDetail.classList.remove("active");
    });
    formDetail.addEventListener("blur", () => {
      formDetail.classList.remove("active");
      document.body.removeChild(formDetail);
    });
  } else {
    if (formDetail) {
      if (formDetail.classList.contains("active")) {
        formDetail.classList.remove("active");
      }
      document.body.removeChild(formDetail);
    } else {
      callFormDetail(index);
      formDetail = document.querySelector(".formDetail");
      formDetail.classList.toggle("active");
      const btn__Confirm = document.querySelector(".btn__Confirm");
      btn__Confirm.addEventListener("click", () => {
        formDetail.classList.remove("active");
      });
      formDetail.addEventListener("blur", () => {
        formDetail.classList.remove("active");
        document.body.removeChild(formDetail);
      });
    }
  }
}
// function changeValue(i) {
//   var x = document.querySelectorAll(".selectStatus")[i].selectedIndex;
//   var color = document.getElementsByTagName("option")[x].value == "pending" ? "green" : "red";
//   var y = document.querySelectorAll(".selectStatus")[i];
//   y.style.backgroundColor = color;
//   y.style.color = "white";

// }

function handleHelloUsername() {
  var helloUsernameBlock = document.querySelector("#hello-username");
  let username = localStorage.getItem("username");
  if (username == null) username = "anonymous";
  let html = `
           <i class="fa fa-envelope"></i> Hello ${username}
          `;

  helloUsernameBlock.innerHTML = html;
}


handleHelloUsername();

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }