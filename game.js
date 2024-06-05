const createGameboard = (function () {
  const Gameboard = {
    gameboard:['','','','','','','','','']
  };

  return Gameboard.gameboard;
})();

function createPlayer (name, choice) {
  let points = 0;
  const increasePoints = () => points++
  const getPoint = () => points;

  return { name, choice, increasePoints, getPoint }
}

const connectBoard = function () {
  const board = document.querySelectorAll('.board-square');

  board[0].textContent = createGameboard[0];
  board[1].textContent = createGameboard[1];
  board[2].textContent = createGameboard[2];
  board[3].textContent = createGameboard[3];
  board[4].textContent = createGameboard[4];
  board[5].textContent = createGameboard[5];
  board[6].textContent = createGameboard[6];
  board[7].textContent = createGameboard[7];
  board[8].textContent = createGameboard[9];

  return board;
};

function playGame() {
  const board = document.querySelectorAll('.board-square');
  const getNameOne = prompt('player one enter name: ');
  const getNameTwo = prompt('player two enter name: ');
  const playerOne = createPlayer(getNameOne, 'X');
  const playerTwo = createPlayer(getNameTwo, 'O');
}

playGame();