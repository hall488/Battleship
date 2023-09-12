import shipSelect from "./shipSelect.html";
import corvette from "./assets/Corvette.svg";
import deathStar from "./assets/Death Star.svg";
import lambdaShuttle from "./assets/Lambda Shuttle.svg";
import milleniumFalcon from "./assets/Millenium Falcon.svg";
import starCruiser from "./assets/Star Cruiser.svg";
import starDestroyer from "./assets/Star Destroyer.svg";
import tieBomber from "./assets/Tie Bomber.svg";
import xWing from "./assets/X Wing.svg";

const ShipSelectDom = (container, shipObserver) => {
  let ships = [];
  let selectedShip;

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

  const buildShipSelect = (team) => {
    container.innerHTML = shipSelect;

    const grid = container.querySelector(".grid");
    selectedShip = document.querySelector(".selected-ship");

    createGrid(grid, 11);

    createShipPanel(team);
  };

  const svgComponent = (source) => {
    const element = document.createElement("object");

    element.data = source;
    element.type = "image/svg+xml";
    element.classList += "svg-object";
    element.style.position = "absolute";

    return element;
  };

  const createGrid = (parent, n) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const div = document.createElement("div");
        div.classList.add("coordinate");
        div.addEventListener("mouseenter", (e) => {
          if (selectedShip.hasChildNodes()) {
            div.append(selectedShip);
          }
        });
        div.addEventListener("click", () => {
          if (selectedShip.hasChildNodes()) {
            let ship = selectedShip.children[0];
            shipObserver.notify({
              id: ship.getAttribute("shipId"),
              x: j,
              y: i,
              rotated: ship.getAttribute("rotated") === "true",
              width: parseInt(ship.getAttribute("gridWidth")),
              height: parseInt(ship.getAttribute("gridHeight")),
            });
          }
        });

        parent.append(div);
      }
    }
  };

  const checkShip = (allowed) => {
    let ship = selectedShip.children[0];
    if (allowed) {
      selectedShip.parentNode.append(ship);
      ships.forEach((s) => {
        s.style.pointerEvents = "";
      });
    } else {
      ship.style.animation = "invalidShake .5s";
    }
  };

  const createShipPanel = (team) => {
    const ul = document.querySelector(".ships");

    document.addEventListener("keypress", (e) => {
      if (selectedShip.hasChildNodes() && e.key === "r") {
        let ship = selectedShip.children[0];

        let rotation = ship.getAttribute("rotated");
        if (rotation == true) {
          selectedShip.classList.remove("rotated");

          ship.style.transform = `rotate(0deg)`;
        } else {
          selectedShip.classList.add("rotated");
          ship.style.transform = `
            rotate(90deg) 
            translate(
                0, 
                -${ship.getAttribute("height")})
            `;
        }

        ship.setAttribute("rotated", !rotation);
      }
    });

    for (let i = 0; i < 5; i++) {
      let component;

      let ship = team == "Rebels" ? rebelShips[i] : empireShips[i];

      component = svgComponent(ship.source);
      component.setAttribute("shipId", i);
      component.setAttribute("gridWidth", ship.width);
      component.setAttribute("gridHeight", ship.height);
      component.setAttribute("rotated", false);
      component.setAttribute("width", `${ship.width * 20}px`);
      component.setAttribute("height", `${ship.height * 20}px`);
      [...ul.children][i].style.height = `${ship.height * 20}px`;

      component.addEventListener("animationend", () => {
        component.style.animation = "none";
      });

      ships.push(component);
      [...ul.children][i].append(component);

      component.addEventListener("load", () => {
        component.contentDocument
          .querySelector("svg")
          .addEventListener("click", () => {
            shipSelectionHandler(component, ul, [...ul.children][i]);
          });
      });
    }
  };

  const shipSelectionHandler = (component, ul, li) => {
    if (!selectedShip.hasChildNodes()) {
      if (component.parentNode === li) li.append(selectedShip);
      if (selectedShip) selectedShip.append(component);

      ships.forEach((s) => {
        if (selectedShip.children[0] === s) {
          return;
        }
        s.style.pointerEvents = "none";
      });
    }
  };

  return { checkShip, buildShipSelect };
};

export default ShipSelectDom;
