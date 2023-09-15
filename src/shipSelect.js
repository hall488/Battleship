import Grid from "./grid";

const ShipSelect = (placementObserver, startObserver) => {
  const grid = Grid(10);
  const ships = [];

  const observerHandler = (data) => {
    if (typeof data == "object") placeShip(data);
    else submitGrid(data);
  };

  const submitGrid = (team) => {
    startObserver.notify([grid, team]);
  };

  const placeShip = ({ id, x, y, rotated, width, height }) => {
    if (ships.includes(id)) {
      ships.splice(ships.indexOf(id), 1);
      grid.clearByValue(id);
    }

    ships.push(id);

    let passed = !rotated
      ? grid.checkBounds(x, y, width, height)
      : grid.checkBounds(x, y, height, width);

    if (passed) {
      !rotated
        ? assignGridValues(id, x, y, rotated, width, height)
        : assignGridValues(id, x, y, rotated, height, width);
    }

    placementObserver.notify([passed, ships.length == 5 ? grid : false]);
  };

  const assignGridValues = (id, x, y, rotated, width, height) => {
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        grid.setVal(i, j, { id, x, y, rotated, width, height });
      }
    }
  };

  return { observerHandler };
};

export default ShipSelect;
