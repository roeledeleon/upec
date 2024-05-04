const homeBtn = document.getElementById("nav-link-home");
const logInBtn = document.getElementById("btn-login");
const logInHTML = document.getElementById("section-LogIn");
const btnCloseLogInForm = document.getElementById("btn-close-loginform");

let SectionLogInInit = (evt) => {
  evt.preventDefault();

  alert("Login Btn clicked");

  // Displays Sign Up New User Form
  // logInHTML.classList.remove("is-hidden");
  // logInBtn.classList.add("inactive");
  // homeBtn.classList.remove("active");
};

// function SectionLogInClose() {}

let SectionLogInClose = (evt) => {
  evt.preventDefault();

  // Hides Sign Up New User Form
  // logInHTML.classList.add("is-hidden");
  // logInBtn.classList.remove("inactive");
  // homeBtn.classList.add("active");
};

logInBtn.addEventListener("click", SectionLogInInit);
//btnCloseLogInForm.addEventListener("click", SectionLogInClose);
