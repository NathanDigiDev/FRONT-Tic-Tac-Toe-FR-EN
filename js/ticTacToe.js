const lang = document.documentElement.lang;

const restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", () => {
  location.reload();
});

let currentPlayer = "X";

const info = document.querySelector(".info");
if (lang === "en") info.textContent = `It's ${currentPlayer}'s turn`;
else info.textContent = `Au tour de ${currentPlayer}`;

const cells = document.querySelectorAll(".cell");

cells.forEach((cell) => {
  cell.addEventListener("click", cellClicked);
});

const currentGame = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function cellClicked(e) {
  const clickedCell = e.target;
  const clickedCellIndex = clickedCell.getAttribute("data-cell-index");

  if (currentGame[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  currentGame[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  verifyWinner();
}

function verifyWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const winCondition = winningCombinations[i];

    let a = currentGame[winCondition[0]];
    let b = currentGame[winCondition[1]];
    let c = currentGame[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    } else if (a === b && b === c && lang === "en") {
      info.textContent = `The player ${currentPlayer} won ! Click on the replay button.`;
      gameActive = false;
      restartButton.innerHTML = "Replay";
      restartButton.style.display = "block";
      return;
    } else if (a === b && b === c) {
      info.textContent = `Le joueur ${currentPlayer} a gagné ! Cliquez sur le bouton pour rejouer.`;
      gameActive = false;
      restartButton.innerHTML = "Rejouer";
      restartButton.style.display = "block";
      return;
    }
  }

  // Match nul
  if (!currentGame.includes("") && lang === "en") {
    info.textContent = `A draw! Click on the button to play again.`;
    gameActive = false;
    restartButton.innerHTML = "Replay";
    restartButton.style.display = "block";
    return;
  } else if (!currentGame.includes("")) {
    info.textContent = `Match nul ! Cliquez sur le bouton pour rejouer.`;
    gameActive = false;
    restartButton.innerHTML = "Rejouer";
    restartButton.style.display = "block";
    return;
  }
  changePlayer();
}

function changePlayer() {
  if (lang === "en") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = `It's ${currentPlayer}'s turn`;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    info.textContent = `Au tour de ${currentPlayer}`;
  }
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
