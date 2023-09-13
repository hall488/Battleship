import "./style.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/brands";
import ScrollingIntro from "./scrollingIntro";
import Observable from "./observable";
import TeamSelectDom from "./teamSelectDom";
import ShipSelect from "./shipSelect";
import ShipSelectDom from "./shipSelectDom";

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

if (skipIntro) {
  scroller.removeIntro();
}

const shipSelect = ShipSelect(placementObserver, startObserver);
const shipSelectDom = ShipSelectDom(container, selectObserver);

teamObserver.subscribe(shipSelectDom.buildShipSelect);

selectObserver.subscribe(shipSelect.observerHandler);
placementObserver.subscribe(shipSelectDom.checkShip);

const startGame = (grid) => {
  container.innerHTML = "";
  console.log(grid);
};

startObserver.subscribe(startGame);

// if (skipTeam) {
//   container.querySelector(".rebels").click();
// }
