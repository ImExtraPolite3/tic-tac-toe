const createGameboard = (function () {
  const Gameboard = {
    gameboard:[,,,,,,,,]
  };

  return Gameboard.gameboard;
})();

function createPlayer (name) {
  let points = 0;
  const increasePoints = () => points++
  const getPoint = () => points;

  return { name, increasePoints, getPoint }
}

const john = createPlayer('john');

john.increasePoints();
john.increasePoints();

console.log(john.getPoint());
