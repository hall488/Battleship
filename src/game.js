import Grid from "./grid";

const Game = (observer) => {
  let playerData;
  let computerData;

  const start = ([grid, team]) => {
    playerData = grid;
    computerData = randomGrid(10);

    toDom({ type: "grid_data", data: { playerData, computerData } });
  };

  const randomGrid = (n) => {};

  const toDom = (message) => {
    observer.notify(message);
  };

  const fromDom = (data) => {};

  return { start, fromDom };
};

export default Game;
