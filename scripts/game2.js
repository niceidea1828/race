let balance = document.querySelector(".balance");
let betAmount = document.querySelector(".bet-amount");
let slotCont = document.querySelector(".slot_cont");

let active = true;
let autoMode = false;

let colAmount = 3;
let rowAmount = 3;
let slotAmount = 3;
let slotLength = 24;
let slotName = "s";

let visibleSlots = [];

balance.innerHTML = localStorage.getItem("balance_race");

setVisibleSlots();

for (let i = 0; i < colAmount; i++) {
  let slotCol = document.createElement("div");
  slotCol.classList.add("slot_col");
  slotCont.appendChild(slotCol);
}

initInnerCols();
drawVisibleSlots();

document.querySelector(".spin").onclick = () => {
  if (!active || (500 > Number(balance.innerHTML) && !playing)) {
    return;
  }

  active = false;

  changeBalance(-500);

  setVisibleSlots();

  drawRandomSlots();
  drawVisibleSlots();

  for (let innerSlotCol of document.querySelectorAll(".inner_slot_col")) {
    innerSlotCol.style.top = -(slotLength + rowAmount) * 100 + "%";
  }

  setTimeout(() => {
    active = true;
    resetSlots();

    if (getMaxCombo() >= 3) {
      gameOver(Math.round((1 + getMaxCombo()) * 500));
    } else {
      gameOver(false);
    }
  }, 5000);
};

$(".auto").click(function () {
  if (autoMode) {
    autoMode = false;
  } else {
    autoMode = true;

    $(".button_play").click();

    let int = setInterval(() => {
      if (!autoMode) {
        clearInterval(int);
        return;
      }

      $(".button_play").click();
    }, 6000);
  }
});

window.onload = () => {
  document.querySelector(".wrapper").classList.remove("hidden");
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setVisibleSlots() {
  for (let i = 0; i < colAmount; i++) {
    visibleSlots[i] = [];

    for (let j = 0; j < rowAmount; j++) {
      visibleSlots[i][j] = randInt(1, slotAmount);
    }
  }
}

function drawRandomSlots() {
  for (let i = 0; i < colAmount; i++) {
    for (let j = 0; j < slotLength; j++) {
      let slot = document.createElement("div");
      slot.classList.add("slot", "block");

      let slotPic = document.createElement("img");
      slotPic.src = `../png/${slotName}${randInt(1, slotAmount)}.png`;

      slot.appendChild(slotPic);
      document.querySelectorAll(".inner_slot_col")[i].appendChild(slot);
    }
  }
}

function drawVisibleSlots() {
  for (let i = 0; i < colAmount; i++) {
    for (let j = 0; j < rowAmount; j++) {
      let slot = document.createElement("div");
      slot.classList.add("slot", "block");

      let slotPic = document.createElement("img");
      slotPic.src = `../png/${slotName}${visibleSlots[i][j]}.png`;

      slot.appendChild(slotPic);
      document.querySelectorAll(".inner_slot_col")[i].appendChild(slot);
    }
  }
}

function initInnerCols() {
  for (let i = 0; i < colAmount; i++) {
    let innerSlotCol = document.createElement("div");
    innerSlotCol.classList.add("inner_slot_col");

    document.querySelectorAll(".slot_col")[i].appendChild(innerSlotCol);
  }
}

function resetSlots() {
  for (let innerSlotCol of document.querySelectorAll(".inner_slot_col")) {
    innerSlotCol.remove();
  }

  initInnerCols();
  drawVisibleSlots();
}

function getMaxCombo() {
  let maxCombo = 1;

  for (let i = 0; i < rowAmount; i++) {
    let combo = 1;

    for (let j = 1; j < colAmount; j++) {
      if (visibleSlots[j][i] == visibleSlots[j - 1][i]) {
        combo++;

        if (combo > maxCombo) {
          maxCombo = combo;
        }
      } else {
        combo = 1;
      }
    }
  }

  return maxCombo;
}

function changeBalance(amount) {
  let balance = document.querySelector(".balance");
  localStorage.setItem(
    "balance_race",
    Number(localStorage.getItem("balance_race")) + amount
  );
  balance.innerHTML = localStorage.getItem("balance_race");
}

function gameOver(win) {
  if (win) {
    changeBalance(win);
  }
}
