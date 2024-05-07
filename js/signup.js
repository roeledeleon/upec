// ----- IMPORTS

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

import { firebaseConfig } from "../js/api/firebase-api.js";

import { CheckHeader } from "./header.js";

// ----- DECLARATIONS

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const myAccountName = document.getElementById("dropdown-account-name");
const createUserBtn = document.getElementById("btn-create-user");

// ----- FUNCTIONS | CreateUser()
let CreateUser = (evt) => {
  evt.preventDefault();

  sessionStorage.setItem("keyUserLogIn", 0);
  let keyUserLogin = sessionStorage.getItem("keyUserLogIn");

  let firstName = document.getElementById("firstNameInput").value;
  let lastName = document.getElementById("lastNameInput").value;
  let emailAddress = document.getElementById("emailAddressInput").value;
  let initialPassword = document.getElementById("initialPasswordInput").value;
  let confirmPassword = document.getElementById("confirmPasswordInput").value;

  // Validate input fields
  if (
    validate_email(emailAddress) === false ||
    validate_password(initialPassword) === false ||
    validate_password(confirmPassword) === false ||
    validate_field(firstName) === false ||
    validate_field(lastName) === false
  ) {
    alert("Invalid Input. Please complete all input values!");
    return;
    // Don't continue to run code
  }

  if (initialPassword == confirmPassword) {
    let approvedPassword = initialPassword;
    createUserWithEmailAndPassword(auth, emailAddress, approvedPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(approvedPassword);
        console.log(user);

        // place user data in sessionStorage
        sessionStorage.setItem("keyUID", user.uid);
        sessionStorage.setItem("keyFirstName", firstName);
        sessionStorage.setItem("keyLastName", lastName);
        sessionStorage.setItem("keyEmailAddress", emailAddress);
        sessionStorage.setItem("keyPassword", approvedPassword);
        sessionStorage.setItem("keyUserLogIn", 1);

        // Add this user to Firebase Database
        var user_data = {
          firstName: sessionStorage.getItem("keyFirstName"),
          lastName: sessionStorage.getItem("keyLastName"),
          emailAddress: sessionStorage.getItem("keyEmailAddress"),
          account_creation: Date.now(),
          last_login: Date.now(),
        };

        CheckHeader();

        const db = getDatabase();
        set(ref(db, "users/" + sessionStorage.getItem("keyUID")), user_data);

        myAccountName.innerText = `Hi ${sessionStorage.getItem(
          "keyFirstName"
        )}!`;

        alert(`User ${emailAddress} Created`);

        //Close SignUp New User Form
        const signUpHTML = document.getElementById("section-SignUp");
        signUpHTML.classList.add("is-hidden");
      })
      .catch((error) => {
        // alert(error.message);
        console.log(errorCode);
        console.log(errorMessage);
        if (errorCode == "auth/weak-password") {
          alert(
            `Password should be at least 6 characters (auth/weak-password).`
          );
          return;
        } else if (errorCode == "auth/email-already-in-use") {
          alert(
            `User ${emailAddress} Already in use. Please use new sign-up email`
          );
          return;
        } else if (errorCode == "auth/missing-password") {
          alert(`Please input password! (auth/missing-password)`);
          return;
        } else if (errorCode == "auth/invalid-credential") {
          alert(`Please input correct password! (auth/missing-password)`);
          return;
        }
      });
  } else {
    alert("Please enter matching Passwords!");
  }
};

// ----- FUNCTIONS | Validate

function validate_email(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

function validate_password(password) {
  //Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

createUserBtn.addEventListener("click", CreateUser);
