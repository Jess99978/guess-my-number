"use strict";
const btnStart = document.querySelector(".btn-start");
const btnRule = document.querySelector(".btn-rule");
const btnClose = document.querySelector(".svg__close");
const modalRule = document.querySelector(".rule");
const modalDifficulty = document.querySelector(".difficulty");
const overlay = document.querySelector(".overlay");
btnStart.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalDifficulty.classList.remove("hidden");
});
btnRule.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  modalRule.classList.remove("hidden");
});
btnClose.addEventListener("click", function () {
  overlay.classList.add("hidden");
  modalRule.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
    modalRule.classList.add("hidden");
    modalDifficulty.classList.add("hidden");
});
