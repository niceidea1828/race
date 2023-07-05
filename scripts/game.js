$(".bet").html(localStorage.bet_race);

let bonus = JSON.parse(localStorage.bonus_race);

let bonusActive = [false, false, false];

let dist = [0, 0, 0];

let mpics = [];

let raceWidth = $(".wrapper").width() - 140;

setTimeout(() => {
  startRace();
}, 500);

$(".m2").attr("src", `../png/m${localStorage.chosen_race}.png`);

setBonus();

let ms = [1, 2, 3];
ms.splice([1, 2, 3].indexOf(+localStorage.chosen_race), 1);

mpics[0] = ms[0];
mpics[1] = +localStorage.chosen_race;
mpics[2] = ms[1];

for (let i = 0; i < 3; i++) {
  $(".m" + (i + 1)).attr("src", `../png/m${mpics[i]}.png`);
}

$(".bonus_cont img").click(function () {
  let bIndex = $(this).index(".bonus_cont img");

  if (!bonus[bIndex]) {
    return;
  }

  bonusActive[bIndex] = true;

  bonus[bIndex] -= 1;
  localStorage.bonus_race = JSON.stringify(bonus);
  setBonus();
});

function startRace() {
  let gameInterval = setInterval(() => {
    for (let i = 0; i < 3; i++) {
      let randDist = randInt(50, 100);

      if (i == 1 && bonusActive[1]) {
        randDist = 200;
        bonusActive[1] = false;
      }

      if (i == 1 && bonusActive[2]) {
        randDist = 200;
        bonusActive[2] = false;
      }

      if (i == 0 && bonusActive[0]) {
        randDist = 0;
      }

      dist[i] += randDist;

      $(".m" + (i + 1)).css({
        left: dist[i]
      });

      if (dist[i] >= raceWidth) {
        clearInterval(gameInterval);
        gameOver();
        return;
      }
    }
  }, 500);
}

function gameOver() {
  let first = dist.indexOf(Math.max(...dist));
  let last = dist.indexOf(Math.min(...dist));

  $(".mpic").eq(0).attr("src", `../png/m${mpics[first]}.png`);

  $(".mpic").eq(2).attr("src", `../png/m${mpics[last]}.png`);

  $(".mpic")
    .eq(1)
    .attr("src", `../png/m${mpics[3 - first - last]}.png`);

  if (first == 1) {
    $(".result").html("YOU WIN");
    $(".win").html("+" + localStorage.bet_race);

    changeBalance(+localStorage.balance_race);
  } else {
    $(".result").html("YOU LOSE");
    $(".win").html("");
  }

  $(".modal").removeClass("hidden");
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setBonus() {
  for (let i = 0; i < 3; i++) {
    $(`.b${i + 1}`).html(bonus[i] + "x");
  }
}

function changeBalance(amount) {
  localStorage.balance_race = +localStorage.balance_race + amount;
  $(".balance").html(localStorage.balance_race);
}
