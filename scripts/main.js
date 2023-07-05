if (!localStorage.getItem("balance_race")) {
  localStorage.setItem("balance_race", 7500);
}

if (!localStorage.bonus_race) {
  localStorage.bonus_race = JSON.stringify([12, 12, 12]);
}

let betAmount = document.querySelector(".bet_amount");

localStorage.setItem("chosen_race", 2);
localStorage.bet_race = betAmount.innerHTML;

$(".back_animal").click(function () {
  localStorage.chosen_race = $(this).index(".back_animal") + 1;

  $(".back_animal").removeClass("chosen");
  $(this).addClass("chosen");
});

$(".link_play img").click(function () {
  changeBalance(-Number(betAmount.innerHTML));
});

document.querySelector(".minus").onclick = () => {
  if (!Number(betAmount.innerHTML)) {
    return;
  }

  betAmount.innerHTML = Number(betAmount.innerHTML) - 50;
  localStorage.bet_race = betAmount.innerHTML;
};

document.querySelector(".plus").onclick = () => {
  if (Number(betAmount.innerHTML) + 50 > +localStorage.balance_race) {
    return;
  }

  betAmount.innerHTML = Number(betAmount.innerHTML) + 50;
  localStorage.bet_race = betAmount.innerHTML;
};

function changeBalance(amount) {
  let balance = document.querySelector(".balance");
  localStorage.setItem(
    "balance_race",
    Number(localStorage.getItem("balance_race")) + amount
  );
  balance.innerHTML = localStorage.getItem("balance_race");
}
