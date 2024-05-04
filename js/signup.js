import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { firebaseConfig } from "../js/api/firebase-api.js";

import { CheckHeader } from "./header.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const myAccountName = document.getElementById("dropdown-account-name");
const createUserBtn = document.getElementById("btn-login");

let CreateUser = (evt) => {
  evt.preventDefault();

  sessionStorage.setItem("keyUserLogIn", 0);
  let keyUserLogin = sessionStorage.getItem("keyUserLogIn");

  let firstName = document.getElementById("firstNameInput");
  let lastName = document.getElementById("lastNameInput");
  let emailAddress = document.getElementById("emailAddressInput");
  let initialPassword = document.getElementById("initialPasswordInput");
  let confirmPassword = document.getElementById("confirmPasswordInput");

  if (
    firstName.value === "" ||
    lastName.value === "" ||
    emailAddress.value === "" ||
    initialPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Invalid Input. Please complete all input values!");
    return;
  }

  if (initialPassword.value == confirmPassword.value) {
    let approvedPassword = initialPassword;
    createUserWithEmailAndPassword(
      auth,
      emailAddress.value,
      approvedPassword.value
    )
      .then((user) => {
        console.log(approvedPassword.value);
        console.log(user);
        alert(`User ${emailAddress.value} Created`);

        sessionStorage.setItem("keyFirstName", firstName.value);
        sessionStorage.setItem("keyLastName", lastName.value);
        sessionStorage.setItem("keyEmailAddress", emailAddress.value);
        sessionStorage.setItem("keyPassword", approvedPassword.value);
        sessionStorage.setItem("keyUserLogIn", 1);
        CheckHeader();

        myAccountName.innerText = `Hi ${sessionStorage.getItem(
          "keyFirstName"
        )}!`;

        //Close SignUp New User Form
        const signUpHTML = document.getElementById("section-SignUp");
        signUpHTML.classList.add("is-hidden");
      })
      .catch((error) => {
        // alert(error.message);
        console.log(error.code);
        console.log(error.message);

        if (error.code == "auth/weak-password") {
          alert(
            `Password should be at least 6 characters (auth/weak-password).`
          );
          return;
        } else if (error.code == "auth/email-already-in-use") {
          alert(
            `User ${emailAddress.value} Already in use. Please use new sign-up email`
          );
          return;
        } else if (error.code == "auth/missing-password") {
          alert(`Please input password! (auth/missing-password)`);
          return;
        }
      });
  } else {
    alert("Please enter matching Passwords!");
  }
};

createUserBtn.addEventListener("click", CreateUser);
