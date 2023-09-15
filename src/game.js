import Grid from "./grid";
import ShipData from "./shipData";
import Ship from "./ship";

const Game = (observer) => {
  let playerData;
  let computerData;
  let playerTeam;
  let computerTeam;
  let playerTries = [];
  let computerTries = [];
  let playerSinks = 0;
  let computerSinks = 0;

  const rebelShips = ShipData().rebelShips;
  const empireShips = ShipData().empireShips;

  const start = ([grid, team]) => {
    playerTeam = team;
    computerTeam = team == "Rebels" ? "Empire" : "Rebels";

    playerData = grid;
    computerData = randomGrid(10);

    console.log(
      computerData.getArray().map((row) =>
        row.map((v) => {
          if (v === null) return null;
          return v.id;
        }),
      ),
    );

    toDom({ type: "grid_data", data: { playerData } });
  };

  const randomGrid = (n) => {
    let grid = Grid(n);

    let ships = [];

    let shipData = computerTeam == "Rebels" ? rebelShips : empireShips;

    for (let [id, { width, height }] of Object.entries(shipData)) {
      for (;;) {
        let x = Math.floor(Math.random() * n);
        let y = Math.floor(Math.random() * n);
        let rotated = 1 == Math.floor(Math.random() * 2);

        let ship = Ship(id, x, y, rotated, width, height);
        let spaces = [];

        if (!rotated) {
          for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
              spaces.push([x + i, y + j]);
            }
          }
        } else {
          for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
              spaces.push([x + i, y + j]);
            }
          }
        }
        if (
          grid.checkBounds(
            x,
            y,
            !rotated ? width : height,
            rotated ? width : height,
          )
        ) {
          ships.push(ship);
          spaces.forEach(([x, y]) => {
            grid.setVal(x, y, ship.values());
          });
          break;
        }
      }
    }

    return grid;
  };

  const tryHit = (attacker, { x, y }) => {
    let grid = attacker == "Player" ? computerData : playerData;
    let tries = attacker == "Player" ? playerTries : computerTries;
    let hit;

    for (let { px, py } of tries) {
      if (x == px && y == py) return;
    }

    let coord = grid.getVal(x, y);

    if (coord !== null) {
      hit = true;
      tries.push({ px: x, py: y, ship: coord });

      if (isSunk(coord, tries)) {
        if (attacker == "Player") {
          toDom({ type: "sink", data: { computerData, id: coord.id } });
        }

        attacker == "Player" ? playerSinks++ : computerSinks++;

        if ((attacker == "Player" ? playerSinks : computerSinks) == 5) {
          toDom({ type: "end_game", data: { winner: attacker } });
        }
      }
    } else {
      hit = false;
      tries.push({ px: x, py: y, ship: null });
    }

    toDom({ type: "try", data: { attacker, x, y, hit } });

    if (attacker === "Player") tryHit("Computer", aiChoice());
  };

  const isSunk = (coord, tries) => {
    let totalHits = tries
      .filter((s) => s.ship !== null)
      .filter((s) => s.ship.id == coord.id).length;

    let totalCoords = coord.width * coord.height;

    return totalCoords === totalHits;
  };

  const toDom = (message) => {
    observer.notify(message);
  };

  const aiChoice = () => {
    for (;;) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);

      let skip = false;

      for (let { px, py } of computerTries) {
        if (x == px && y == py) skip = true;
      }

      if (!skip) return { x, y };
    }
  };

  const fromDom = (message) => {
    switch (message.type) {
      case "try_hit":
        tryHit("Player", message.data);

        break;
    }
  };

  return { start, fromDom };
};

export default Game;
