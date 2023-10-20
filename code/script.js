const board = document.getElementById("board");
const resultMessage = document.getElementById("result");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
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

resetButton.addEventListener("click", resetBoard);

function makeMove(cell) {
    const cellIndex = parseInt(cell.dataset.index);

    if (gameBoard[cellIndex] === "" && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === "X" ? "#3498db" : "#e74c3c";
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        checkWin();
    }
}

function checkWin() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameBoard[a] &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            gameActive = false;
            resultMessage.textContent = `${gameBoard[a]} wins!`;
        }
    }

    if (!gameBoard.includes("") && gameActive) {
        gameActive = false;
        resultMessage.textContent = "It's a draw!";
    }
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    resultMessage.textContent = "";
    board.querySelectorAll(".cell").forEach((cell) => {
        cell.textContent = "";
    });
}

for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => makeMove(cell));
    board.appendChild(cell);
}
