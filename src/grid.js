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
    console.log(x, y);
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

  const getArray = () => array;

  return { getArray, getVal, setVal, width, height };
};

export default Grid;
