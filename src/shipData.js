import corvette from "./assets/Corvette.svg";
import deathStar from "./assets/Death Star.svg";
import lambdaShuttle from "./assets/Lambda Shuttle.svg";
import milleniumFalcon from "./assets/Millenium Falcon.svg";
import starCruiser from "./assets/Star Cruiser.svg";
import starDestroyer from "./assets/Star Destroyer.svg";
import tieBomber from "./assets/Tie Bomber.svg";
import xWing from "./assets/X Wing.svg";

const ShipData = () => {
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

  return { rebelShips, empireShips };
};

export default ShipData;
