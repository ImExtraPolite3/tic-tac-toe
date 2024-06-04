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

function playGame() {
  const board = document.querySelectorAll('.board-square');
  const getNameOne = prompt('player one enter name: ');
  const getNameTwo = prompt('player two enter name: ');
  const playerOne = createPlayer(getNameOne, 'X');
  const playerTwo = createPlayer(getNameTwo, 'O');

  for (let i = 0; i < 9; i++) {
    board[i].addEventListener('click', () => {
      if (i % 2 === 0) {
        board[i].textContent = playerOne.choice;
      } else {
        board[i].textContent = playerTwo.choice;
      }
    })
  }
}

playGame();