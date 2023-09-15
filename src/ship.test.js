import Ship from "./ship";

let ship = Ship("2", 5, 6, false, 3, 1);

//values, id, x, y, rotated, width, height

test("Id test", () => {
  expect(ship.id()).toBe("2");
});

test("X test", () => {
  expect(ship.x()).toBe(5);
});
test("Y test", () => {
  expect(ship.y()).toBe(6);
});
test("R test", () => {
  expect(ship.rotated()).toBe(false);
});

test("W test", () => {
  expect(ship.width()).toBe(3);
});

test("H test", () => {
  expect(ship.height()).toBe(1);
});

test("Values test", () => {
  expect(ship.values()).toStrictEqual({
    id: "2",
    x: 5,
    y: 6,
    rotated: false,
    width: 3,
    height: 1,
  });
});
