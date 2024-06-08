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
  const resetPoints = () => points = 0;

  return { name, choice, increasePoints, getPoint, resetPoints }
}

const connectBoard = function () {
  const board = document.querySelectorAll('.board-square');
  for (let i = 0; i < createGameboard.length; i++) {
    createGameboard[i] = board[i].textContent;
  }

  return createGameboard;
};

function userInput() {
  const board = document.querySelectorAll('.board-square');
  const playerOne = createPlayer('player one', 'X');
  const playerTwo = createPlayer('player two', 'O');
  let num = 0;
  const reset = document.querySelector('.reset');

  board.forEach(eachSquare => {
    eachSquare.addEventListener('click', () => {
      if (num <= 8 && num % 2 === 0 && winCondition(playerOne.name, playerTwo.name) !== playerOne.name + ' wins') {
        if (eachSquare.textContent === '') {
          eachSquare.textContent = playerOne.choice;
          num++;
        }
      } else if (num <= 8 && num % 2 !== 0 && winCondition(playerOne.name, playerTwo.name) !== playerTwo.name + ' wins') {
        if (eachSquare.textContent === '') {
          eachSquare.textContent = playerTwo.choice;
          num++;
        }
      }

      console.log(winCondition(playerOne.name, playerTwo.name));

      if (winCondition(playerOne.name, playerTwo.name) === playerOne.name + ' wins' || winCondition(playerOne.name, playerTwo.name) === playerTwo.name + ' wins') {
        if (winCondition(playerOne.name, playerTwo.name) === playerOne.name + ' wins') {
          playerOne.increasePoints();
        } else if (winCondition(playerOne.name, playerTwo.name) === playerTwo.name + ' wins') {
          playerTwo.increasePoints();
        }

        announce(winCondition(playerOne.name, playerTwo.name), playerOne.getPoint(), playerTwo.getPoint(), playerOne.name, playerTwo.name);
        num = 0;
      }
      playAnotherGame();
      reset.addEventListener('click', () => resetScore(playerOne.resetPoints(), playerTwo.resetPoints()));
    })
  })
}

const announce = function (winner, playerOneScore, playerTwoScore, playerOneName, playerTwoName) {
  const afterGame = document.querySelector('.after-game');
  const announceWinner = document.querySelector('.announce-winner');
  const displayPlayerOneScore = document.querySelector('.players-one-score');
  const displayPlayerTwoScore = document.querySelector('.players-two-score');

  announceWinner.textContent = winner;
  displayPlayerOneScore.textContent = `${playerOneName}'s score: ${playerOneScore}`;
  displayPlayerTwoScore.textContent = `${playerTwoName}'s score: ${playerTwoScore}`;
  afterGame.showModal();
}

const playAnotherGame = function () {
  const afterGame = document.querySelector('.after-game');
  const nextGame = document.querySelector('.next-game');
  const board = document.querySelectorAll('.board-square');

  nextGame.addEventListener('click', () => {
    for (let i = 0; i < createGameboard.length; i++) {
      createGameboard[i] = '';
      board[i].textContent = '';
    }

    afterGame.close();
  })
}

const resetScore = function (playerOneReset, playerTwoReset) {
  const board = document.querySelectorAll('.board-square');
  const afterGame = document.querySelector('.after-game');

  for (let i = 0; i < createGameboard.length; i++) {
    createGameboard[i] = '';
    board[i].textContent = '';
  }

  playerOneReset;
  playerTwoReset;
  afterGame.close();
}

const winCondition = function (playerOneName, playerTwoName) {
  const squares = connectBoard();
  const combination = {
    line1: [0, 1, 2],
    line2: [3, 4, 5],
    line3: [6, 7, 8],
    line4: [0, 4, 8],
    line5: [2, 4, 6],
    line6: [0, 3, 6],
    line7: [1, 4, 7],
    line8: [2, 5, 8]
  };
  const something = Object.values(combination);

  for (let i = 0; i < something.length; i++) {
    if (squares[something[i][0]] === 'X' && squares[something[i][1]] === 'X' && squares[something[i][2]] === 'X') {
      return playerOneName + ' wins';
    } else if (squares[something[i][0]] === 'O' && squares[something[i][1]] === 'O' && squares[something[i][2]] === 'O') {
      return playerTwoName + ' wins';
    } else if (squares[something[i][0]] !== 'X' && squares[something[i][1]] !== 'X' && squares[something[i][2]] !== 'X') {
      if (squares[something[i][0]] !== 'O' && squares[something[i][1]] !== 'O' && squares[something[i][2]] !== 'O') {
        return 'draw';
      }
    }
  }
}

userInput();