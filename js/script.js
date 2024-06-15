"use strict";
const btnStart = document.querySelector(".btn-start");
const btnRule = document.querySelector(".btn--rule");
const btnStartGame = document.querySelector(".btn--start-game");
const btnSubmit = document.querySelector(".btn--submit");
const btnRestart = document.querySelector(".btn--restart");
const btnAgain = document.querySelector(".btn--again");
const modalDifficulty = document.querySelector(".difficulty");
const overlay = document.querySelector(".overlay");
const warning = document.querySelector(".warning");
const difficultyText = document.querySelector(".game__difficulty");
// main.html
const input = document.querySelector(".input-number");
const gameInstruction = document.querySelector(".game__instruction-number");
const answerBox = document.querySelector(".answer");
const answerText = document.querySelector(".answer-text");
const chanceText = document.querySelector(".chance");
const chance = document.querySelector(".chance span");
const highScore = document.querySelector(".high-score");
const line = document.querySelector(".line");
const imgCelebrate = document.querySelectorAll(".img-celebrate");
const loseStyle =
  "linear-gradient(195deg, rgba(96, 27, 61) 11.27%, rgba(198, 56, 126) 90.4%)";
// audio
const clickSound = new Audio("../audio/poka02.mp3");
const clickSound2 = new Audio("../audio/powerup01.mp3");
const submitSound = new Audio("../audio/select08.mp3");
const wrongSound = new Audio("../audio/blip03.mp3");
const winGameSound = new Audio("../audio/long_clap1.mp3");
const celebrateSound = new Audio("../audio/stadium_fireworks.mp3")
const loseGameSound = new Audio("../audio/requiem2.mp3");
// function
const hiddenElement = function (elements) {
  document.querySelectorAll(elements).forEach((element) => {
    element.classList.add("hidden");
  });
};
const setGameOverBackground = function (backgroundColor) {
  line.style.background = backgroundColor;
  btnRestart.style.background = backgroundColor;
  answerBox.style.background = backgroundColor;
};
const clickToReload = function (elements) {
  document.querySelectorAll(elements).forEach((element) => {
    element.addEventListener("click", () => {
      location.reload();
    });
  });
};
const animateControl = function (
  targetElement,
  animationType,
  animationDuration
) {
  targetElement.style.setProperty("--animate-duration", animationDuration);
  targetElement.classList.add("animate__animated", animationType);
  targetElement.addEventListener("animationend", () => {
    targetElement.classList.remove("animate__animated", animationType);
  });
};
let selectedDifficulty = 0;
let remainedChance = 10;
let newHighScore;
newHighScore = Number(localStorage.getItem("newHighScore")) || 0;

document.addEventListener("DOMContentLoaded", function () {
  const page = document.body.dataset.page;
  if (page === "page1") {
    //  ---------modal control---------------
    btnStart.addEventListener("click", function () {
      clickSound2.play();
      overlay.classList.remove("hidden");
      modalDifficulty.classList.remove("hidden");
    });
    overlay.addEventListener("click", () => {
      modalDifficulty.classList.add("hidden");
    });
   document.querySelectorAll(".radio__group").forEach(e => {
      e.addEventListener("click", () => {
        clickSound.play();
      })
    })
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
        wrongSound.play();
      }
    });
  } else if (page === "page2") {
    // 根據選擇難度，初始化遊戲執行畫面
    let answer;
    chance.textContent = remainedChance;
    highScore.innerHTML = `🏅 歷史高分：<span class="font-en">${newHighScore}</span>`;
    const selectedDifficulty = Number(
      localStorage.getItem("selectedDifficulty")
    );
    clickToReload(".btn--restart");
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
    console.log(`${answer}
你真是個狠角色🫣，被你發現答案就在這裡...`);
    const handleSubmit = function () {
      const inputNumber = Number(input.value);
      console.log(`本次猜的數字：${inputNumber}`);
      // 驗證使用者填入範圍外的數字的情況
      if (selectedDifficulty === 1 && (inputNumber <= 0 || inputNumber > 20)) {
        submitSound.play();
        answerText.innerHTML = `請輸入 <span class="font-en">1-20</span> 的數字`;
        answerText.style.fontSize = "3.125rem";
        animateControl(answerText, "animate__headShake", "1s");
        return;
      } else if (
        selectedDifficulty === 2 &&
        (inputNumber <= 0 || inputNumber > 50)
      ) {
        submitSound.play();
        answerText.innerHTML = `請輸入 <span class="font-en">1-50</span> 的數字`;
        answerText.style.fontSize = "3.125rem";
        animateControl(answerText, "animate__headShake", "1s");
        return;
      } else if (
        selectedDifficulty === 3 &&
        (inputNumber <= 0 || inputNumber > 100)
      ) {
        submitSound.play();
        answerText.innerHTML = `請輸入 <span class="font-en">1-100</span> 的數字`;
        answerText.style.fontSize = "3.125rem";
        animateControl(answerText, "animate__headShake", "1s");
        return;
      }
      // ------遊戲執行判斷---------------
      // 用完十次機會，遊戲結束
      if (inputNumber !== answer && remainedChance <= 1) {
        loseGameSound.play();
        answerText.textContent = "Game Over";
        answerText.classList.remove("font-zh");
        answerText.classList.add("font-en");
        answerText.style.fontSize = "5rem";
        hiddenElement(
          ".game__instruction, .game__difficulty, .btn--submit,.input-number, .chance, .high-score, .btn--rule"
        );
        setGameOverBackground(loseStyle);
        // 玩家輸了之後，點一下中間顯示正解
        answerBox.style.cursor = "pointer";
        animateControl(answerText, "animate__hinge", "1.2s");
        answerBox.addEventListener("click", () => {
          animateControl(answerBox, "animate__flipInY", "1.1s");
          answerBox.textContent = answer;
          hiddenElement(".img-question");
        });
      } else if (inputNumber > answer) {
        wrongSound.play();
        animateControl(input, "animate__swing", "0.7s");
        answerText.textContent = "太大了😮！試個小一點的數字看看";
        answerText.style.fontSize = "2.75rem";
        remainedChance--;
        chance.textContent = remainedChance;
        animateControl(chanceText, "animate__flash", "1s");
      } else if (inputNumber < answer) {
        wrongSound.play();
        animateControl(input, "animate__swing", "0.7s");
        answerText.textContent = "太小了😮！試個大一點的數字看看！";
        answerText.style.fontSize = "2.75rem";
        remainedChance--;
        chance.textContent = remainedChance;
        animateControl(chanceText, "animate__flash", "1s");
        //--- 玩家猜中數字-------
      } else if (inputNumber === answer) {
        const setWinStyle = function () {
          answerText.style.fontSize = "3.25rem";
          hiddenElement(
            ".btn--restart,.btn--rule,.game-info,.img-question,.guess-area"
          );
          document.querySelector(".score-area").style.right = "55%";
          document.querySelector(".score-area").style.bottom = "18%";
          btnAgain.classList.remove("hidden");
          clickToReload(".btn--again");
        };
        const calcScore = function (remainedChance) {
          if (remainedChance > 9) {
            if (selectedDifficulty === 1) {
              return 20;
            } else if (selectedDifficulty === 2) {
              return 50;
            } else if (selectedDifficulty === 3) {
              return 100;
            }
          } else {
            if (selectedDifficulty === 1) {
              return remainedChance;
            } else if (selectedDifficulty === 2) {
              return remainedChance * 2;
            } else if (selectedDifficulty === 3) {
              return remainedChance * 3;
            }
          }
        };
        const thisTimeScore = calcScore(remainedChance);
        chanceText.innerHTML = `💯 本次分數：<span class="font-en">${thisTimeScore}</span>`;
        newHighScore =
          thisTimeScore > newHighScore ? thisTimeScore : newHighScore;
        localStorage.setItem("newHighScore", newHighScore);
        highScore.innerHTML = `🏅 歷史高分：<span class="font-en">${newHighScore}</span>`;
        answerBox.textContent = answer;
        // 一次命中
        if (inputNumber === answer && remainedChance > 9) {
          celebrateSound.play();
          answerText.textContent = "一次命中 🫢！你快去買樂透！";
          setWinStyle();
          animateControl(answerBox, "animate__backInLeft", "0.8s");
          animateControl(answerText, "animate__swing", "1.5s");
          // 一次命中時的特殊樣式
          imgCelebrate.forEach((img) => {
            img.classList.remove("hidden");
          });
        } else {
          // 十次內成功猜到答案，遊戲結束
          winGameSound.play();
          answerText.textContent = "猜對了 🥳 你太厲害了！";
          setWinStyle();
          animateControl(answerBox, "animate__bounce", "1.2s");
        }
      }
    };
    btnSubmit.addEventListener("click", handleSubmit);
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSubmit();
      }
    });
  }
});
