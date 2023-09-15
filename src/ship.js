const Ship = (_id, _x, _y, _rotated, _width, _height) => {
  const id = () => _id;
  const x = () => _x;
  const y = () => _y;
  const rotated = () => _rotated;
  const width = () => _width;
  const height = () => _height;
  const values = () => {
    return {
      id: id(),
      x: x(),
      y: y(),
      rotated: rotated(),
      width: width(),
      height: height(),
    };
  };
  return { values, id, x, y, rotated, width, height };
};

export default Ship;
