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

const grabNames = function() {
  const getName = document.querySelector('.grab-names');
  const getPlayerOneName = document.getElementById('get-pOne-name');
  const getPlayerTwoName = document.getElementById('get-pTwo-name');
  const askName = document.querySelector('.get-name');
  const board = document.querySelector('.board');
  const noName = document.querySelector('.no-name-hide');

  getName.addEventListener('click', () => {
    if (getPlayerOneName.value !== '' && getPlayerTwoName.value !== '') {
      askName.classList.add('hide');
      board.classList.remove('hide');
      board.classList.add('show');

      userInput(getPlayerOneName.value, getPlayerTwoName.value);
    } else {
      noName.className = 'no-name-show';
    }
  })
}

function userInput(getPlayerOneName, getPlayerTwoName) {
  const board = document.querySelectorAll('.board-square');
  const playerOne = createPlayer(getPlayerOneName, 'X');
  const playerTwo = createPlayer(getPlayerTwoName, 'O');
  let num = 0;
  const reset = document.querySelector('.reset');
  const displayTurn = document.querySelector('.display-turn');

  displayTurn.textContent = playerOne.name + "'s turn";


  board.forEach(eachSquare => {
    eachSquare.addEventListener('click', () => {
      if (num <= 8 && num % 2 === 0 && winCondition(playerOne.name, playerTwo.name) !== playerOne.name + ' wins') {
        if (eachSquare.textContent === '') {
          displayTurn.textContent = playerTwo.name + "'s turn";
          eachSquare.textContent = playerOne.choice;
          num++;
        }
      } else if (num <= 8 && num % 2 !== 0 && winCondition(playerOne.name, playerTwo.name) !== playerTwo.name + ' wins') {
        if (eachSquare.textContent === '') {
          displayTurn.textContent = playerOne.name + "'s turn";
          eachSquare.textContent = playerTwo.choice;
          num++;
        }
      }

      if (winCondition(playerOne.name, playerTwo.name) === playerOne.name + ' wins' || winCondition(playerOne.name, playerTwo.name) === playerTwo.name + ' wins' || winCondition(playerOne.name, playerTwo.name) === 'draw') {
        if (winCondition(playerOne.name, playerTwo.name) === playerOne.name + ' wins') {
          playerOne.increasePoints();
        } else if (winCondition(playerOne.name, playerTwo.name) === playerTwo.name + ' wins') {
          playerTwo.increasePoints();
        }

        announce(winCondition(playerOne.name, playerTwo.name), playerOne.getPoint(), playerTwo.getPoint(), playerOne.name, playerTwo.name);
        displayTurn.textContent = playerOne.name + "'s turn";
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
    } else if (i == something.length - 1 && squares[something[i][0]] !== '' && squares[something[i][1]] !== '' && squares[something[i][2]] !== '') {
      return 'draw';
    }
  }
}

grabNames();