const Grid = (n) => {
  const array = [];

  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      let value = null;
      row.push(value);
    }
    array.push(row);
  }

  const getVal = (x, y) => {
    return array[y][x];
  };

  const setVal = (x, y, val) => {
    array[y][x] = val;
  };

  const width = () => {
    if (array.length != 0) {
      return array[0].length;
    } else {
      throw Error("Grid is empty");
    }
  };

  const height = () => {
    if (array.length != 0) {
      return array.length;
    } else {
      throw Error("Grid is empty");
    }
  };

  const clearByValue = (val) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (getVal(i, j) !== null && getVal(i, j).id == val) {
          setVal(i, j, null);
        }
      }
    }
  };

  const checkBounds = (x, y, w, h) => {
    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        if (width() <= i || height() <= j || getVal(i, j) !== null) {
          return false;
        }
      }
    }
    return true;
  };

  const getArray = () => array;

  return { checkBounds, clearByValue, getArray, getVal, setVal, width, height };
};

export default Grid;
