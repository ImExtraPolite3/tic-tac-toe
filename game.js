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
  for (let i = 0; i < 9; i++) {
    createGameboard[i] = board[i].textContent;
  }

  return createGameboard;
};

function userInput() {
  const board = document.querySelectorAll('.board-square');
  const playerOne = createPlayer('player one', 'X');
  const playerTwo = createPlayer('player two', 'O');
  let num = 0;

  board.forEach(eachSquare => {
    eachSquare.addEventListener('click', () => {
      if (num < 9 && num % 2 === 0 && winCondition() !== 'player one wins') {
        eachSquare.textContent = playerOne.choice;
        // console.log(winCondition());
        num++;
      } else if (num < 9 && num % 2 !== 0 && winCondition() !== 'player two wins') {
        eachSquare.textContent = playerTwo.choice;
        // console.log(winCondition());
        num++;
      } 
      // console.log(connectBoard());
      // winCondition();
      console.log(winCondition());
    })
  })
}

const winCondition = function () {
  const squares = connectBoard();
  const combination = {
    line1: [0, 1, 2],
    line2: [3, 4, 5],
    line3: [6, 7, 8],
    line4: [0, 4, 8],
    line5: [2, 4, 6]
  };
  const something = Object.values(combination);

  for (let i = 0; i < something.length; i++) {
    if (squares[something[i][0]] === 'X' && squares[something[i][1]] === 'X' && squares[something[i][2]] === 'X') {
      return 'player one wins';
    } else if (squares[something[i][0]] === 'O' && squares[something[i][1]] === 'O' && squares[something[i][2]] === 'O') {
      return 'player two wins';
    }
  }
}

userInput();