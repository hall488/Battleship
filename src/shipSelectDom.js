import shipSelect from "./shipSelect.html";
import ShipData from "./shipData";

const ShipSelectDom = (container, shipObserver) => {
  let ships = [];
  let selectedShip;
  let submitBtn;

  const rebelShips = ShipData().rebelShips;
  const empireShips = ShipData().empireShips;

  const buildShipSelect = (team) => {
    container.innerHTML = shipSelect;

    const grid = container.querySelector(".grid");
    selectedShip = document.querySelector(".selected-ship");
    submitBtn = document.querySelector(".submit");

    submitBtn.addEventListener("click", () => {
      shipObserver.notify(team);
    });

    createGrid(grid, 10);

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

  const checkShip = ([allowed, final]) => {
    let ship = selectedShip.children[0];
    if (allowed) {
      selectedShip.parentNode.append(ship);
      ships.forEach((s) => {
        s.style.pointerEvents = "";
      });
      selectedShip.style.width = 0;
      selectedShip.style.height = 0;

      selectedShip.parentNode.removeChild(selectedShip);
    } else {
      selectedShip.style.animation = "invalidShake .25s";
    }

    if (final) {
      submitBtn.style.display = "flex";
    } else {
      submitBtn.style.display = "none";
    }
  };

  const createShipPanel = (team) => {
    const ul = document.querySelector(".ships");

    document.addEventListener("keypress", (e) => {
      if (selectedShip.hasChildNodes() && e.key === "r") {
        let ship = selectedShip.children[0];

        let rotation = ship.getAttribute("rotated");
        if (rotation == "true") {
          selectedShip.classList.remove("rotated");

          ship.style.transform = `rotate(0deg)`;
          selectedShip.style.width = ship.getAttribute("width");
          selectedShip.style.height = ship.getAttribute("height");
        } else {
          selectedShip.classList.add("rotated");
          ship.style.transform = `
            rotate(90deg) 
            translate(
                -1px, 
                calc(-${ship.getAttribute("height")} + 1px))
            `;
          selectedShip.style.width = ship.getAttribute("height");
          selectedShip.style.height = ship.getAttribute("width");
        }

        ship.setAttribute("rotated", !(rotation == "true"));
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

      selectedShip.addEventListener("animationend", () => {
        selectedShip.style.animation = "none";
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

      selectedShip.append(component);
      submitBtn.style.display = "none";
      if (component.getAttribute("rotated") == "false") {
        selectedShip.style.width = component.getAttribute("width");
        selectedShip.style.height = component.getAttribute("height");
      } else {
        selectedShip.style.width = component.getAttribute("height");
        selectedShip.style.height = component.getAttribute("width");
      }

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
