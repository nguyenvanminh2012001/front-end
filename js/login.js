var registerApi = "http://localhost:8088/api/user/register";
var loginApi = "http://localhost:8088/api/user/login";

var formLogin = document.querySelector("#login");

var registerBtn = document.querySelector("#btn-register");
registerBtn.onclick = function () {
  let hat = true;
  let pate = true;
  let cat = true;
  let quanao = true;
  var firstname = document.querySelector('input[name="firstname"]').value;
  var lastname = document.querySelector('input[name="lastname"]').value;
  var username = document.querySelector('input[name="username"]').value;
  var password = document.querySelector('input[name="password"]').value;
  console.log(firstname);

  var formData = {
    first_name: firstname,
    last_name: lastname,
    user_name: username,
    user_password: password,
    hat: hat,
    pate: pate,
    cat: cat,
    quanao: quanao
  };
  register(formData);
};

async function register(data) {
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(registerApi, options)
    .then(function (response) {
      console.log(response.status);
      let status = response.status;
      if (status <= 299 && status >= 200) {
        // 200–299
        alert("Đăng kí thành công!");

        var formData2 = {
          user_name: data.user_name,
          user_password: data.user_password
        }
        login(formData2, firstLogin = "firstLogin");
        document.querySelector('input[name="firstname"]').value = "";
        document.querySelector('input[name="lastname"]').value = "";
        document.querySelector('input[name="username"]').value = "";
        document.querySelector('input[name="password"]').value = "";
        // window.location.href = "relatedInfo.html"
      } else {
        alert("Username đã tồn tại vui lòng thử lại!");
      }
    })
    .catch(function () {
      alert("ngủ");
    });
}
const loginBtn = document.querySelector("#btn-login");
loginBtn.onclick = (event) => {
  handleLogin(event);
};
function handleLogin(event) {
  event.preventDefault();

  var username = document.querySelector('input[name="user_name"]').value;
  var password = document.querySelector('input[name="pswd"]').value;

  var formData = {
    user_name: username,
    user_password: password,
  };
  login(formData);
}

async function login(data, firstLogin) {
  console.log(data);
  var options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch(loginApi, options)
    .then(function (response) {
      let status = response.status;
      if (status > 299 || status < 200) {
        alert("Your username or password are not correct!");
      }
      var myJSON_promise = response.json();
      return myJSON_promise;
    })
    .then(function (myJSON) {
      if (myJSON.user_id != undefined) {
        //Todo save user_id and token
        localStorage.setItem("user_id", myJSON.user_id);
        localStorage.setItem("token", myJSON.login_token);
        localStorage.setItem("username", myJSON.username);
        localStorage.setItem("typeUser", myJSON.user_type);
        document.querySelector('input[name="firstname"]').value = "";
        document.querySelector('input[name="lastname"]').value = "";
        document.querySelector('input[name="username"]').value = "";
        document.querySelector('input[name="password"]').value = "";
        // if (firstLogin == "firstLogin") {
        //   window.location.href = "relatedInfo.html";

        // }
        // else {
          window.location.href = "index.html";

        // }
      }
    })
    .catch(function () {
      alert("error");
    });
}