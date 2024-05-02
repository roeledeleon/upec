import { CheckActiveNavBtn } from "./header.js";

const newsBtn = document.getElementById("nav-link-news");

function CheckNav() {
  CheckActiveNavBtn(2);
}

newsBtn.addEventListener("click", CheckNav);
