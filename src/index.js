import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";
import ScrollingIntro from "./scrollingIntro";
import Observable from "./observable";
import TeamSelectDom from "./teamSelectDom";
import ShipSelect from "./shipSelect";
import ShipSelectDom from "./shipSelectDom";
import Game from "./game";
import GameDom from "./gameDom";
import Grid from "./grid";

const container = document.querySelector(".container");

const introObserver = Observable();
const teamObserver = Observable();
const selectObserver = Observable();
const placementObserver = Observable();
const startObserver = Observable();

const scroller = ScrollingIntro(container, introObserver);

const skipIntro = true;
const skipTeam = true;

const teamSelectDom = TeamSelectDom(container, teamObserver);

introObserver.subscribe(teamSelectDom.buildTeamSelect);

// if (skipIntro) {
//   scroller.removeIntro();
// }

const shipSelect = ShipSelect(placementObserver, startObserver);
const shipSelectDom = ShipSelectDom(container, selectObserver);

teamObserver.subscribe(shipSelectDom.buildShipSelect);

selectObserver.subscribe(shipSelect.observerHandler);
placementObserver.subscribe(shipSelectDom.checkShip);

const gameToDom = Observable();
const domToGame = Observable();

const game = Game(gameToDom);
const gameDom = GameDom(container, domToGame);

startObserver.subscribe(gameDom.buildGame);
startObserver.subscribe(game.start);

// const testGrid = Grid(10);

// const fakeShips = (x, y, id) => {
//   if (id == 0) {
//     let width = 5;
//     let height = 1;
//     let rotated = true;
//     testGrid.setVal(x, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 1, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 2, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 3, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 4, { id, x, y, rotated, width, height });
//   }

//   if (id == 1) {
//     let width = 2;
//     let height = 2;
//     let rotated = false;
//     testGrid.setVal(x, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x + 1, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 1, { id, x, y, rotated, width, height });
//     testGrid.setVal(x + 1, y + 1, { id, x, y, rotated, width, height });
//   }

//   if (id == 2) {
//     let width = 3;
//     let height = 1;
//     let rotated = true;
//     testGrid.setVal(x, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 1, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 2, { id, x, y, rotated, width, height });
//   }

//   if (id == 3) {
//     let width = 2;
//     let height = 1;
//     let rotated = false;
//     testGrid.setVal(x, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 1, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 2, { id, x, y, rotated, width, height });
//   }

//   if (id == 4) {
//     let width = 2;
//     let height = 1;
//     let rotated = false;
//     testGrid.setVal(x, y, { id, x, y, rotated, width, height });
//     testGrid.setVal(x, y + 1, { id, x, y, rotated, width, height });
//   }
// };

// fakeShips(0, 0, "0");
// fakeShips(6, 6, "1");
// fakeShips(4, 7, "2");
// fakeShips(2, 5, "3");
// fakeShips(3, 4, "4");

gameToDom.subscribe(gameDom.fromGame);
domToGame.subscribe(game.fromDom);

// startObserver.notify([testGrid, "Empire"]);

// gameDom.endGame({ winner: "Computer" });

// if (skipTeam) {
//   container.querySelector(".rebels").click();
// }
