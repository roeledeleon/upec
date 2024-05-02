import { CheckActiveNavBtn } from "./header.js";

const myAccountBtn = document.getElementById("nav-link-myaccount");

function CheckNav() {
  CheckActiveNavBtn(4);
}

myAccountBtn.addEventListener("click", CheckNav);
