import Grid from "./grid";
import Ship from "./ship";

const ShipSelect = (placementObserver) => {
  const grid = Grid(11);
  let selectedShip;

  const placeShip = ({ id, x, y, rotated, width, height }) => {
    console.log(x, y);
    let passed = !rotated
      ? checkBounds(x, y, width, height)
      : checkBounds(x, y, height, width);

    if (passed) {
      !rotated
        ? assignGridValues(id, x, y, width, height)
        : assignGridValues(id, x, y, height, width);
    }
    //selectedShip = Ship(...Object.values(data));

    placementObserver.notify(passed);
  };

  const checkBounds = (x, y, width, height) => {
    console.log(x, y, width, height);
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        if (
          grid.width() <= x ||
          grid.height() <= y ||
          grid.getVal(i, j) !== null
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const assignGridValues = (id, x, y, width, height) => {
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        grid.setVal(i, j, id);
      }
    }
  };

  return { placeShip };
};

export default ShipSelect;
