import html from "./game.html";
import ShipData from "./shipData";

const GameDom = (container, toGameObserver) => {
  let playerGrid;
  let computerGrid;
  let team;

  let rebelShips = ShipData().rebelShips;
  let empireShips = ShipData().empireShips;

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

    createGrid(playerGrid, 10, false);
    createGrid(computerGrid, 10, true);
  };

  const createGrid = (parent, n, selectable) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const div = document.createElement("div");
        div.classList.add("coordinate");

        if (selectable) {
          div.addEventListener("click", () => {
            toGame({ type: "try_hit", data: { x: j, y: i } });
          });
        }

        parent.append(div);
      }
    }
  };

  const populateGrid = ({ playerData }) => {
    let loaded = [];

    for (let i = 0; i < playerData.width(); i++) {
      for (let j = 0; j < playerData.height(); j++) {
        let coord = playerData.getVal(i, j);
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
                -1px, 
                calc(-${component.getAttribute("height")} + 1px))
            `;
          }

          playerGrid.children[i + j * 10].append(component);
        }
      }
    }
  };

  const updateGrid = ({ attacker, x, y, hit }) => {
    let grid = attacker == "Player" ? computerGrid : playerGrid;

    let coord = grid.children[x + y * 10];

    let div = document.createElement("div");
    div.classList.add("try");
    let icon = document.createElement("i");

    if (hit) {
      icon.classList.add("fa-solid", "fa-square-xmark");
    } else {
      icon.classList.add("fa-solid", "fa-solid", "fa-circle-dot");
    }
    div.append(icon);

    coord.append(div);
  };

  const showComputerShip = ({ computerData, id }) => {
    for (let i = 0; i < computerData.width(); i++) {
      for (let j = 0; j < computerData.height(); j++) {
        let coord = computerData.getVal(i, j);
        if (coord !== null && coord.id == id) {
          let component;

          let ship =
            team != "Rebels" ? rebelShips[coord.id] : empireShips[coord.id];

          component = svgComponent(ship.source);
          component.setAttribute("width", `${ship.width * 20}px`);
          component.setAttribute("height", `${ship.height * 20}px`);

          if (coord.rotated) {
            component.style.transform = `
              rotate(90deg) 
              translate(
                  -1px, 
                  calc(-${component.getAttribute("height")} + 1px))
              `;
          }

          computerGrid.children[i + j * 10].append(component);
          return;
        }
      }
    }
  };

  const endGame = ({ winner }) => {
    container.querySelector(".grids").style.pointerEvents = "none";
    container.querySelector(".grids").style.filter = "blur(5px)";
    const winnerEl = container.querySelector(".winner");

    winnerEl.style.display = "flex";
    winnerEl.querySelector(".text").textContent = winner + " Wins!";

    let icon = winnerEl.querySelector(".icon");

    let i = document.createElement("i");

    let enemyTeam = team == "Rebels" ? "Empire" : "Rebels";

    if (winner == "Player") {
      icon.classList.add(team);
      if (team == "Rebels") {
        i.classList.add("fa-brands", "fa-rebel");
      } else {
        i.classList.add("fa-brands", "fa-empire");
      }
    } else {
      icon.classList.add(enemyTeam);
      if (enemyTeam == "Rebels") {
        i.classList.add("fa-brands", "fa-rebel");
      } else {
        i.classList.add("fa-brands", "fa-empire");
      }
    }

    icon.append(i);
    winnerEl.append(icon);

    winnerEl.querySelector(".restart").addEventListener("click", () => {
      location.reload();
    });
  };

  const toGame = (data) => {
    toGameObserver.notify(data);
  };

  const fromGame = (message) => {
    switch (message.type) {
      case "grid_data":
        populateGrid(message.data);
        break;
      case "try":
        updateGrid(message.data);
        break;
      case "sink":
        showComputerShip(message.data);
        break;
      case "end_game":
        endGame(message.data);
        break;
    }
  };

  return { endGame, buildGame, fromGame };
};

export default GameDom;
