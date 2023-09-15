import Grid from "./grid";

let grid = Grid(10);

test("Height Test", () => {
  expect(grid.height()).toBe(10);
});

test("Width Test", () => {
  expect(grid.width()).toBe(10);
});

test("Set and Get Test", () => {
  grid.setVal(3, 4, { id: 5 });
  expect(grid.getVal(3, 4).id).toBe(5);
  expect(grid.getVal(0, 0)).toBe(null);
});

test("Get Array", () => {
  let array = grid.getArray();
  expect(array.length).toBe(10);
  expect(array[0].length).toBe(10);
  expect(array[4][3].id).toBe(5);
});

test("Clear Test", () => {
  grid.clearByValue(5);
  expect(grid.getVal(3, 4)).toBe(null);
});

test("Check Bounds Test", () => {
  expect(grid.checkBounds(9, 5, 1, 5)).toBe(true);
  expect(grid.checkBounds(0, 0, 9, 9)).toBe(true);
  expect(grid.checkBounds(9, 5, 1, 6)).toBe(false);
  expect(grid.checkBounds(9, 5, 2, 5)).toBe(false);
});
