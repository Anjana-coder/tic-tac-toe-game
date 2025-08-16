const boardElement = document.getElementById('board');
const statusElement = document.querySelector('.status');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameOver = false;

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => makeMove(index));
    boardElement.appendChild(cell);
  });
}

function makeMove(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;
  const cell = boardElement.children[index];
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins!`;
    gameOver = true;
    showEndGamePopup(`Player ${currentPlayer} wins!`);
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a draw!";
    gameOver = true;
    showEndGamePopup("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

function showEndGamePopup(message) {
  setTimeout(() => {
    if (confirm(`${message}\nDo you want to play a new game?`)) {
      restartGame();
    }
  }, 100);
}

createBoard();
