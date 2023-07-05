const prices = [250, 450, 550];

let active = true;

$(".buy").click(function () {
  let bInd = $(this).index(".buy");

  if (+localStorage.balance_race < prices[bInd] || !active) {
    return;
  }

  active = false;

  $(this).html("+1");

  changeBalance(-prices[bInd]);

  let bonus = JSON.parse(localStorage.bonus_race);
  bonus[bInd]++;
  localStorage.bonus_race = JSON.stringify(bonus);

  setTimeout(() => {
    $(this).html("buy");
    active = true;
  }, 500);
});

function changeBalance(amount) {
  localStorage.balance_race = +localStorage.balance_race + amount;
  $(".balance").html(localStorage.balance_race);
}
