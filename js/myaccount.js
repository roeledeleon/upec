// ----- IMPORTS
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { CheckHeader } from "./header.js";

// ----- DECLARATIONS
const LogOutProceedBtn = document.getElementById("btn-logout-proceed");

// ----- FUNCTIONS | SectionLogOut()
let SectionLogOut = (evt) => {
  evt.preventDefault();
  LogOutUser();
};

// ----- FUNCTIONS | LogOutUser()
function LogOutUser() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });

  //clear sessionStorage
  sessionStorage.setItem("keyUserLogIn", 0);
  let keyUserLogin = sessionStorage.getItem("keyUserLogIn");
  CheckHeader();
  sessionStorage.clear();

  //clear emailAddress and loginPassword
  let emailAddress = document.getElementById("loginEmailAddressInput");
  let loginPassword = document.getElementById("loginPasswordInput");
  emailAddress.value = "";
  loginPassword.value = "";
}

// ----- ACTIVE LISTENERS
LogOutProceedBtn.addEventListener("click", SectionLogOut);
