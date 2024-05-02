import { CheckActiveNavBtn } from "./header.js";

const aboutBtn = document.getElementById("nav-link-about");

function CheckNav() {
  CheckActiveNavBtn(1);
}

aboutBtn.addEventListener("click", CheckNav);
