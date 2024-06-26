const homeBtn = document.getElementById("nav-link-home");
const aboutBtn = document.getElementById("nav-link-about");
const newsBtn = document.getElementById("nav-link-news");
const resourcesBtn = document.getElementById("nav-link-resources");
const loginBtn = document.getElementById("nav-link-login");
const signupBtn = document.getElementById("nav-link-signup");
const myAccountBtn = document.getElementById("nav-link-myaccount");

export function CheckHeader() {
  let keyUserLogIn = sessionStorage.getItem("keyUserLogIn");

  if (keyUserLogIn == 1) {
    resourcesBtn.classList.remove("is-hidden");
    loginBtn.classList.add("is-hidden");
    signupBtn.classList.add("is-hidden");
    myAccountBtn.classList.remove("is-hidden");
  } else {
    resourcesBtn.classList.add("is-hidden");
    loginBtn.classList.remove("is-hidden");
    signupBtn.classList.remove("is-hidden");
    myAccountBtn.classList.add("is-hidden");
  }
}

export function CheckActiveNavBtn(e) {
  if (homeBtn.classList.length > 1) {
    homeBtn.classList.remove("active");
  }
  if (aboutBtn.classList.length > 1) {
    aboutBtn.classList.remove("active");
  }
  if (newsBtn.classList.length > 1) {
    newsBtn.classList.remove("active");
  }
  if (resourcesBtn.classList.length > 1) {
    resourcesBtn.classList.remove("active");
  }
  if (myAccountBtn.classList.length > 1) {
    myAccountBtn.classList.remove("active");
  }

  switch (e) {
    case 0:
      if (homeBtn.classList.length > 1) {
      } else {
        homeBtn.classList.add("active");
      }

      break;
    case 1:
      if (aboutBtn.classList.length > 1) {
      } else {
        aboutBtn.classList.add("active");
      }
      break;
    case 2:
      if (newsBtn.classList.length > 1) {
      } else {
        newsBtn.classList.add("active");
      }
      break;
    case 3:
      if (resourcesBtn.classList.length > 1) {
      } else {
        resourcesBtn.classList.add("active");
      }
      break;
    case 4:
      if (myAccountBtn.classList.length > 1) {
      } else {
        myAccountBtn.classList.add("active");
      }
      break;
  }
}
