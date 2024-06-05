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
  createGameboard[0] = board[0].textContent;
  createGameboard[1] = board[1].textContent;
  createGameboard[2] = board[2].textContent;
  createGameboard[3] = board[3].textContent;
  createGameboard[4] = board[4].textContent;
  createGameboard[5] = board[5].textContent;
  createGameboard[6] = board[6].textContent;
  createGameboard[7] = board[7].textContent;
  createGameboard[8] = board[8].textContent;

  return createGameboard;
};

function userInput() {
  const board = document.querySelectorAll('.board-square');
  const playerOne = createPlayer('player one', 'X');
  const playerTwo = createPlayer('player two', 'O');
  let num = 0;

  board.forEach(eachSquare => {
    eachSquare.addEventListener('click', () => {
      if (num < 9 && num % 2 === 0 && winCondition() !== 'player one win') {
        eachSquare.textContent = playerOne.choice;
        console.log(winCondition());
        num++;
      } else if (num < 9 && num % 2 !== 0 && winCondition() !== 'player one win') {
        eachSquare.textContent = playerTwo.choice;
        console.log(winCondition());
        num++;
      } 
    })
  })
}

const winCondition = function () {
  const squares = connectBoard();

  if (squares[0] === 'X' && squares[1] === 'X' && squares[2] === 'X') {
    return 'player one win';
  }
}

userInput();