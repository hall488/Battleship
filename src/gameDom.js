import html from "./game.html";
import corvette from "./assets/Corvette.svg";
import deathStar from "./assets/Death Star.svg";
import lambdaShuttle from "./assets/Lambda Shuttle.svg";
import milleniumFalcon from "./assets/Millenium Falcon.svg";
import starCruiser from "./assets/Star Cruiser.svg";
import starDestroyer from "./assets/Star Destroyer.svg";
import tieBomber from "./assets/Tie Bomber.svg";
import xWing from "./assets/X Wing.svg";

const GameDom = (container) => {
  let playerGrid;
  let computerGrid;
  let team;

  const rebelShips = {
    0: { source: starCruiser, width: 5, height: 1 },
    1: { source: milleniumFalcon, width: 2, height: 2 },
    2: { source: corvette, width: 3, height: 1 },
    3: { source: corvette, width: 3, height: 1 },
    4: { source: xWing, width: 2, height: 1 },
  };

  const empireShips = {
    0: { source: starDestroyer, width: 5, height: 1 },
    1: { source: deathStar, width: 2, height: 2 },
    2: { source: lambdaShuttle, width: 3, height: 1 },
    3: { source: lambdaShuttle, width: 3, height: 1 },
    4: { source: tieBomber, width: 2, height: 1 },
  };

  const svgComponent = (source) => {
    const element = document.createElement("object");

    element.data = source;
    element.type = "image/svg+xml";
    element.classList += "svg-object";
    element.style.position = "absolute";

    return element;
  };

  const buildGame = ([_grid, _team]) => {
    team = _team;
    container.innerHTML = html;
    playerGrid = document.querySelector(".player > .grid");
    computerGrid = document.querySelector(".computer > .grid");

    createGrid(playerGrid, 10);
    createGrid(computerGrid, 10);
  };

  const createGrid = (parent, n) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const div = document.createElement("div");
        div.classList.add("coordinate");
        parent.append(div);
      }
    }
  };

  const updateGrid = ({ playerData, computerData }) => {
    let pa = playerData;

    let loaded = [];

    for (let i = 0; i < pa.width(); i++) {
      for (let j = 0; j < pa.height(); j++) {
        let coord = pa.getVal(i, j);
        if (coord && !loaded.includes(coord.id)) {
          loaded.push(coord.id);
          let component;

          let ship =
            team == "Rebels" ? rebelShips[coord.id] : empireShips[coord.id];

          component = svgComponent(ship.source);
          component.setAttribute("width", `${ship.width * 20}px`);
          component.setAttribute("height", `${ship.height * 20}px`);

          if (coord.rotated) {
            component.style.transform = `
            rotate(90deg) 
            translate(
                0, 
                -${component.getAttribute("height")})
            `;
          }

          playerGrid.children[i + j * 10].append(component);
        }
      }
    }
  };

  const toGame = () => {};

  const fromGame = (message) => {
    switch (message.type) {
      case "grid_data":
        updateGrid(message.data);
        break;
    }
  };

  return { buildGame, fromGame };
};

export default GameDom;
