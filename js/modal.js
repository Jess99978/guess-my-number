document.addEventListener("DOMContentLoaded", () => {
  const modalHTML = `<div class="modal rule hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="34"
        viewBox="0 0 37 34"
        fill="none"
        class="svg__close"
      >
        <path
          d="M18.3333 31.9037C27.3539 31.9037 34.6666 25.2096 34.6666 16.9519C34.6666 8.69418 27.3539 2 18.3333 2C9.31266 2 2 8.69418 2 16.9519C2 25.2096 9.31266 31.9037 18.3333 31.9037Z"
          stroke="#EEEEEE"
          stroke-width="3"
        />
        <path
          d="M22.4166 13.2139L14.25 20.6898M14.2499 13.2139L22.4166 20.6898"
          stroke="#EEEEEE"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      <div class="rule__content">
        <h3>遊戲規則</h3>
        <ul>
          <li>使用者輸入數字並提交後，會提示數字太大或太小</li>
          <li>有 10 次機會猜中數字</li>
          <li>猜數字範圍：
            🍼 幼幼班 1-20 / 🫅 中級班 1-50 / 🦹‍♀️ 大師班 1-100</li>
          <li>10 次內猜中即獲勝，否則遊戲結束</li>
        </ul>
      </div>
      <div class="rule__content">
        <h3>計分方式</h3>
        <ul>
          <li>🍼 幼幼班：分數 = 剩餘機會 * 1</li>
          <li>🫅 中級班：分數 = 剩餘機會 * 2</li>
          <li>🦹‍♀️ 大師班：分數 = 剩餘機會 * 3</li>
          <li>✨ 一次命中 Bonus： 🍼 幼幼班 30 分 / 🫅 中級班 50 分 / 🦹‍♀️ 大師班 100 分</li>
        </ul>
      </div>
      <div class="rule__content">
        <h3>舉例</h3>
        <ol>
          <li>
            小北選擇幼幼班難度，在剩下 5 次機會時猜中，分數 = 5 * 1 = 5 分
          </li>
          <li>小勳選擇大師班難度，猜第一次試就直接命中，分數 = 100 分</li>
        </ol>
      </div>
    </div>`;
  // 將 modal 插入至 body 末端
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  const btnClose = document.querySelector(".svg__close");
  const modalRule = document.querySelector(".rule");
  const overlay = document.querySelector(".overlay");
  const clickSound2 = new Audio("../powerup01.mp3");
  const closeModal = function () {
    modalRule.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  //  點擊按鈕顯示 modal
  btnRule.addEventListener("click", () => {
    clickSound2.play()
    modalRule.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
  //  點擊叉叉關閉 modal
  btnClose.addEventListener("click", closeModal);
  //  點擊外層 overlay 關閉 modal
  overlay.addEventListener("click", closeModal);
});
