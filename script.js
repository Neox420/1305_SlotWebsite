const reel = document.querySelector(".reel");
const symbolImages = document.querySelectorAll(".symbol");
const spinButton = document.getElementById("spinButton");
const betAmount = document.getElementById("betAmount");
const resultMessage = document.getElementById("resultMessage");
const balanceAmount = document.getElementById("balanceAmount");
const spinText = document.getElementById("spinText");

let balance = 1500;
balanceAmount.textContent = balance;

spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  const bet = parseInt(betAmount.value);
  
  if (bet > balance) {
    resultMessage.textContent = "Balance too low";
    spinButton.disabled = false;
    return;
  }
  
  playBoing();
  const reelResults = [];

  spinText.style.display = "block"; // Anzeige des Textes "Spinning..."

  setTimeout(() => {
    spinText.style.display = "none"; // Verstecken des Textes nach dem Spin

    for (let i = 0; i < 3; i++) {
      const combination = getRandomCombination();
      reelResults.push(combination);
      symbolImages[i].src = `symbol${combination - 1}.png`;
    }
    const isThreeOfAKind = reelResults[0] === reelResults[1] && reelResults[1] === reelResults[2];
    const payoutMultiplier = isThreeOfAKind ? getPayoutMultiplier(reelResults[0], 3) : 0;
    const winnings = bet * payoutMultiplier;
    balance -= bet;
    balance += winnings;
    balanceAmount.textContent = balance;
    if (payoutMultiplier > 0) {
      resultMessage.textContent = `Congratulations! You won ${winnings}!`;
      playJackpot();
    } else {  
      resultMessage.textContent = "Better luck next time!";
    }
    spinButton.disabled = false; // Aktivieren des Spin-Buttons nach dem Spin
  }, 1200);});

function getRandomCombination() {
  const randomValue = Math.random();
  const probabilities = [0.25, 0.18, 0.15, 0.12, 0.1, 0.08, 0.07, 0.05];
  let cumulativeProbability = 0;
  
  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue <= cumulativeProbability) {
      return i + 1;
    }
  }
  return 0;
}

function playBoing() {
  const boing = document.getElementById("wheel_sound");
  boing.play();
}

function playJackpot() {
  const jackpot = document.getElementById("jackpot_sound");
  jackpot.play();
}

function getPayoutMultiplier(combination) {
  const payouts = [2, 3, 5, 10, 15, 50, 100, 250, 300];
  if (combination > 0) {
    return payouts[combination];
  }
}
