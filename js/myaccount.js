// ----- IMPORTS
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { CheckHeader } from "./header.js";

// ----- DECLARATIONS
const LogOutProceedBtn = document.getElementById("btn-logout-proceed");
const ProfileDisplayBtn = document.getElementById("dropdown-profile-display");

// ----- FUNCTIONS | ProfileDispaly()
function ProfileDisplay() {
  let inputFirstName = sessionStorage.getItem("keyFirstName");
  let inputLastName = sessionStorage.getItem("keyLastName");
  let inputEmailAddress = sessionStorage.getItem("keyEmailAddress");
  document.getElementById("firstNameProfileInput").value = inputFirstName;
  document.getElementById("lastNameProfileInput").value = inputLastName;
  document.getElementById("emailAddressProfileInput").value = inputEmailAddress;
}

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
ProfileDisplayBtn.addEventListener("click", ProfileDisplay);
