// ----- IMPORTS

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
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

const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
  types: [
    {
      type: "warning",
      background: "orange",
      icon: {
        className: "material-icons",
        tagName: "i",
        text: "warning",
        dismissible: true,
      },
    },
    {
      type: "error",
      background: "indianred",
      duration: 2000,
      dismissible: true,
    },
  ],
});

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
    notyf.error({
      message: "Invalid Input. Please complete all input values!",
      duration: 3000,
    });
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
        sessionStorage.setItem("keyUserLogIn", 0);

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

        //Close SignUp New User Form
        const signUpHTML = document.getElementById("section-SignUp");
        signUpHTML.classList.add("is-hidden");

        // console.log(auth.currentUser);
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        notyf.open({
          type: warning,
          message: `User ${emailAddress} created. \nVerification email was sent to your address. \nOnce verified, you can now Log-In`,
          duration: 5000,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ManageErrors(errorCode, emailAddress);
      });
  } else {
    notyf.error({
      message: "Please enter matching Passwords!",
      duration: 3000,
    });
  }
};

// ----- FUNCTIONS | Validate

function validate_email(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    notyf.error({
      message: "You have entered an invalid email address!",
      duration: 3000,
    });
  }
  return false;
}

function validate_password(password) {
  //Firebase only accepts lengths greater than 6
  if (password.length < 6) {
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

function ManageErrors(errorCode, emailAddress) {
  if (errorCode == "auth/weak-password") {
    notyf.error({
      message: `Password should be at least 6 characters (auth/weak-password).`,
    });
    return;
  } else if (errorCode == "auth/email-already-in-use") {
    notyf.error({
      message: `User ${emailAddress} Already in use. \nPlease use new sign-up email`,
    });
    return;
  } else if (errorCode == "auth/missing-password") {
    notyf.error({
      message: `Please input password! (auth/missing-password)`,
    });
    return;
  } else if (errorCode == "auth/invalid-credential") {
    notyf.error({
      message: `Please input correct password! (auth/missing-password)`,
    });
    return;
  } else if (errorCode == "auth/too-many-requests") {
    notyf.error({
      message: `Error! (auth/too-many-requests)`,
    });
    return;
  }
}

createUserBtn.addEventListener("click", CreateUser);
