import { CheckActiveNavBtn } from "./header.js";

const resourcesBtn = document.getElementById("nav-link-resources");

function CheckNav() {
  CheckActiveNavBtn(3);
}

resourcesBtn.addEventListener("click", CheckNav);
