var signUpUserName = document.getElementById("name");
var signUpEmail = document.getElementById("email");
var signUpPassword = document.getElementById("password");
var signUpButton = document.getElementById("signUpBtn");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var users = [];

if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}
var username = localStorage.getItem("sessionUsername");
if (username && document.getElementById("username")) {
  document.getElementById("username").innerHTML = "Welcome " + username;
}

function validateSignUp() {
  // Username validation
  if (signUpUserName.value.length < 3) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Username must be at least 3 characters long.</span>';
    return false;
  }

  // Email validation (must contain '@' and a domain like gmail.com)
  var emailPattern = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  if (!emailPattern.test(signUpEmail.value)) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Invalid email format. Please use a valid email address. Example: john@gmail.com</span>';
    return false;
  }

  // Password validation (must be at least 6 characters, contain special characters and at least one uppercase letter)
  var passwordPattern = /^(?=.*[A-Z])(?=.*\W).{6,}$/;
  if (!passwordPattern.test(signUpPassword.value)) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Password must be at least 6 characters long, include at least one uppercase letter, and contain a special character.</span>';
    return false;
  }
  return true;
}
function isEmpty() {
  return (
    signUpUserName.value !== "" &&
    signUpEmail.value !== "" &&
    signUpPassword.value !== ""
  );
}
function isEmailExist(email) {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase());
}

function register() {
  // Validate the form before proceeding
  if (!validateSignUp()) {
    return false;
  }

  if (!isEmpty()) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }

  var newUser = {
    name: signUpUserName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
  };

  if (isEmailExist(newUser.email)) {
    document.getElementById("exist").innerHTML =
      '<span class="text-danger m-3">Email already exists</span>';
  } else {
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("exist").innerHTML =
      '<span class="text-success m-3">Success! User registered.</span>';
    clearForm();
  }
}

function clearForm() {
  signUpUserName.value = "";
  signUpEmail.value = "";
  signUpPassword.value = "";
}



function isLoginEmpty() {
  return signinEmail.value !== "" && signinPassword.value !== "";
}

function login() {
  if (!isLoginEmpty()) {
    document.getElementById("incorrect").innerHTML =
      '<span class="text-danger m-3">All inputs are required</span>';
    return false;
  }

  var email = signinEmail.value;
  var password = signinPassword.value;

  var user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (user) {
    localStorage.setItem("sessionUsername", user.name);
    window.location.href = "home.html"; // Redirect to home page
  } else {
    document.getElementById("incorrect").innerHTML =
      '<span class="p-2 text-danger">Incorrect email or password</span>';
  }

}

function logout() {
  localStorage.removeItem("sessionUsername");
  window.location.href = "index.html"; // Redirect to login page
}
