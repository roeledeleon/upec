// ----- IMPORTS

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  child,
  get,
  update,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

import { firebaseConfig } from "../js/api/firebase-api.js";

import { CheckHeader } from "./header.js";

// ----- DECLARATIONS

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const myAccountName = document.getElementById("dropdown-account-name");
const logInBtn = document.getElementById("btn-login");
const submitBtn = document.getElementById("btn-reset-password-submit");
const proceedBtn = document.getElementById("btn-nav-reset-password-proceed");

// ----- FUNCTIONS | SectionLogInInit()
let SectionLogInInit = (evt) => {
  evt.preventDefault();

  LogInUser();
};

// ----- FUNCTIONS | LogInUser()
let LogInUser = () => {
  "user strict";
  sessionStorage.setItem("keyUserLogIn", 0);
  let keyUserLogin = sessionStorage.getItem("keyUserLogIn");

  let emailAddress = document.getElementById("loginEmailAddressInput").value;
  let loginPassword = document.getElementById("loginPasswordInput").value;

  // Validate input fields
  if (
    validate_email(emailAddress) == false ||
    validate_password(loginPassword) == false
  ) {
    // alert("Email or password not OK");
    return;
    // Don't continue to run code
  }

  signInWithEmailAndPassword(auth, emailAddress, loginPassword)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log(user);
      if (user.emailVerified == true) {
        sessionStorage.setItem("keyUID", user.uid);
        sessionStorage.setItem("keyEmailAddress", emailAddress);
        sessionStorage.setItem("keyPassword", loginPassword);
        sessionStorage.setItem("keyUserLogIn", 1);

        // update last_login data of Firebase Database
        var user_data = {
          last_login: Date.now(),
        };
        const db = getDatabase();
        update(ref(db, "users/" + sessionStorage.getItem("keyUID")), user_data);

        // downloading realtime data from firebase
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${sessionStorage.getItem("keyUID")}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const realtimeDB = {
                firstName: snapshot.val().firstName,
                lastName: snapshot.val().lastName,
                emailAddress: snapshot.val().emailAddress,
                last_login: snapshot.val().last_login,
              };

              // place user data in sessionStorage
              sessionStorage.setItem("keyFirstName", realtimeDB.firstName);
              sessionStorage.setItem("keyLastName", realtimeDB.lastName);

              alert(`User ${realtimeDB.emailAddress} Log-In Successfully!`);

              myAccountName.innerText = `Hi ${sessionStorage.getItem(
                "keyFirstName"
              )}!`;

              CheckHeader();
            } else {
              // console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("Email not verified\nKindly verify email sent to your address.");
        return;
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // console.log(errorCode);
      // console.log(errorMessage);
      ManageErrors(errorCode, errorMessage);
    });
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
    alert("Password should be at least 6 characters!");
    return false;
  } else {
    return true;
  }
}

// ----- FUNCTIONS | SectionResetPassword()

let SectionResetPassword = (evt) => {
  evt.preventDefault();
  ("user strict");

  let resetPasswordEmailAddress = document.getElementById(
    "resetPasswordEmailAddressInput"
  ).value;

  // Validate input fields
  if (validate_email(resetPasswordEmailAddress) == false) {
    // alert("Email or password not OK");
    return;
    // Don't continue to run code
  }
  alert(`Password reset email sent to ${resetPasswordEmailAddress}!`);
  // const auth = getAuth();
  sendPasswordResetEmail(auth, resetPasswordEmailAddress)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // console.log(errorCode);
      // console.log(errorMessage);
      ManageErrors(errorCode, errorMessage);
      // ..
    });

  document.getElementById("resetPasswordEmailAddressInput").value = "";
};

// ----- FUNCTIONS | SectionResetPassword()

let SectionNavResetPassword = (evt) => {
  evt.preventDefault();
  ("user strict");

  let emailAddress = sessionStorage.getItem("keyEmailAddress");
  alert(`Password reset email sent to ${emailAddress}!`);

  // const auth = getAuth();
  sendPasswordResetEmail(auth, emailAddress)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      ManageErrors(errorCode, errorMessage);
      // ..
    });
};

function ManageErrors(errorCode, errorMessage) {
  if (errorCode == "auth/weak-password") {
    alert(`Password should be at least 6 characters (auth/weak-password).`);
    return;
  } else if (errorCode == "auth/email-already-in-use") {
    alert(
      `User ${emailAddress} Already in use. \nPlease use new sign-up email`
    );
    return;
  } else if (errorCode == "auth/missing-password") {
    alert(`Please input password! (auth/missing-password)`);
    return;
  } else if (errorCode == "auth/invalid-credential") {
    alert(`Please input correct password! (auth/missing-password)`);
    return;
  } else if (errorCode == "auth/too-many-requests") {
    alert(`Error! (auth/too-many-requests)`);
    return;
  }
}

logInBtn.addEventListener("click", SectionLogInInit);
submitBtn.addEventListener("click", SectionResetPassword);
proceedBtn.addEventListener("click", SectionNavResetPassword);
