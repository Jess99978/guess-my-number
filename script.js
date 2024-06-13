"use strict";
const btnStart = document.querySelector(".btn-start");
const btnRule = document.querySelector(".btn-rule");
const btnClose = document.querySelector(".svg__close");
const btnStartGame = document.querySelector(".btn--start-game");
const btnSubmit = document.querySelector(".btn--submit");
const btnRestart = document.querySelector(".btn--restart");
const btnAgain = document.querySelector(".btn--again");
const modalRule = document.querySelector(".rule");
const modalRuleP2 = document.querySelector(".btn--rule");
const modalDifficulty = document.querySelector(".difficulty");
const overlay = document.querySelector(".overlay");
const warning = document.querySelector(".warning");
const difficultyText = document.querySelector(".game__difficulty");
const input = document.querySelector(".input-number");
const gameInstruction = document.querySelector(".game__instruction-number");
const answerText = document.querySelector(".answer-text");
const chanceText = document.querySelector(".chance");
const chance = document.querySelector(".chance span");
const highScore = document.querySelector(".high-score");
const line = document.querySelector(".line");
const loseBackground =
  "linear-gradient(195deg, rgba(96, 27, 61) 11.27%, rgba(198, 56, 126) 90.4%)";
let selectedDifficulty = 0;
let remainedChance = 10;
let newHighScore = localStorage.getItem("newHighScore");

//  ---------modal control---------------
document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.dataset.page;
  if (page === "page1") {
    btnStart.addEventListener("click", function () {
      overlay.classList.remove("hidden");
      modalDifficulty.classList.remove("hidden");
    });

    btnStartGame.addEventListener("click", function () {
      const selectedValue = document.querySelector(
        "input[name=difficulty]:checked"
      );
      if (selectedValue) {
        selectedDifficulty = Number(selectedValue.value);
        localStorage.setItem("selectedDifficulty", selectedDifficulty);
        location.href = "./main.html";
      } else {
        warning.classList.remove("hidden");
      }
    });
  } else if (page === "page2") {
    chance.textContent = remainedChance;
    let answer = null;
    highScore.innerHTML = `🏅 歷史高分：<span class="font-en">${newHighScore}</span>`;
    const selectedDifficulty = Number(
      localStorage.getItem("selectedDifficulty")
    );
    if (selectedDifficulty === 1) {
      difficultyText.textContent = "當前挑戰難度：🍼 幼幼班";
      gameInstruction.textContent = "1-20";
      answer = Math.floor(Math.random() * 20 + 1);
    } else if (selectedDifficulty === 2) {
      difficultyText.textContent = "當前挑戰難度：🫅中級班";
      gameInstruction.textContent = "1-50";
      answer = Math.floor(Math.random() * 50 + 1);
    } else if (selectedDifficulty === 3) {
      difficultyText.textContent = "當前挑戰難度：🦹‍♀️ 大師班";
      gameInstruction.textContent = "1-100";
      answer = Math.floor(Math.random() * 100 + 1);
    }
    // TODO 加上 鍵盤事件 enter 送出
    btnSubmit.addEventListener("click", function () {
      console.log(answer);
      const inputNumber = Number(input.value);
      console.log(Number(inputNumber));
      // 用完十次機會，遊戲結束
      if (inputNumber !== answer && remainedChance <= 1) {
        answerText.textContent = "Game Over";
        answerText.classList.remove("font-zh");
        answerText.classList.add("font-en");
        answerText.style.fontSize = "88px";
        answerText.style.left = "35%";
        answerText.style.top = "22%";
        document
          .querySelectorAll(
            ".game__instruction, .game__difficulty, .btn--submit,.input-number, .chance, .high-score, .btn--rule"
          )
          .forEach((e) => {
            e.classList.add("hidden");
          });
        line.style.background = loseBackground;
        btnRestart.style.background = loseBackground;
        document.querySelector(".answer").style.background = loseBackground;
        btnRestart.addEventListener("click", function () {
          location.reload();
        });
      } else if (inputNumber > answer) {
        answerText.textContent = "太大了😮！試個小一點的數字看看";
        answerText.style.fontSize = "48px";
        answerText.style.left = "28%";
        remainedChance--;
        chance.textContent = remainedChance;
      } else if (inputNumber < answer) {
        answerText.textContent = "太小了😮！試個大一點的數字看看！";
        answerText.style.fontSize = "48px";
        answerText.style.left = "28%";
        remainedChance--;
        chance.textContent = remainedChance;
      } else if (inputNumber === answer) {
        // 十次內成功猜到答案，遊戲結束
        answerText.textContent = "猜對了 🥳 你太厲害了！";
        answerText.style.fontSize = "60px";
        answerText.style.left = "32%";
        document
          .querySelectorAll(
            ".btn--restart,.btn--rule,.game-info,.img-question,.guess-area"
          )
          .forEach((e) => {
            e.classList.add("hidden");
          });
        document.querySelector(".score-area").style.right = "54%";
        document.querySelector(".score-area").style.bottom = "185px";

        const calcScore = function (remainedChance) {
          if (selectedDifficulty === 1) {
            return remainedChance;
          } else if (selectedDifficulty === 2) {
            return remainedChance * 2;
          } else if (selectedDifficulty === 3) {
            return remainedChance * 3;
          }
        };
        const thisTimeScore = calcScore(remainedChance);
        chanceText.innerHTML = `💯 本次分數：<span class="font-en">${thisTimeScore}</span>`;
        newHighScore =
          thisTimeScore > newHighScore ? thisTimeScore : newHighScore;
        localStorage.setItem("newHighScore", newHighScore);
        highScore.innerHTML = `🏅 歷史高分：<span class="font-en">${newHighScore}</span>`;
        btnAgain.classList.remove("hidden");
        btnAgain.addEventListener("click", function () {
          location.reload();
        });
        document.querySelector(".answer").textContent = answer;
      }
    });
  }
  btnRestart.addEventListener("click", function () {
    location.reload();
  });
});
