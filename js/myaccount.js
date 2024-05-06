// ----- IMPORTS
import { CheckActiveNavBtn } from "./header.js";

// ----- DECLARATIONS
const myAccountBtn = document.getElementById("nav-link-myaccount");
const logOutBtn = document.getElementById("dropdown-logout");

// ----- FUNCTIONS | CheckNav()
function CheckNav() {
  CheckActiveNavBtn(4);
}

// ----- FUNCTIONS | Log-Out()

function LogOut() {
  alert("Logging-Out");

  //sessionStorage.clear();
}

// ----- ACTIVE LISTENERS
myAccountBtn.addEventListener("click", CheckNav);
logOutBtn.addEventListener("Click", LogOut);
