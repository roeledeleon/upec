import { CheckActiveNavBtn } from "./header.js";

const homeBtn = document.getElementById("nav-link-home");

function CheckNav() {
  CheckActiveNavBtn(0);
}

homeBtn.addEventListener("click", CheckNav);
