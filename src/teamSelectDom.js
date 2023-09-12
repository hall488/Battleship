import teamSelect from "./teamSelect.html";

const TeamSelectDom = (container, teamObserver) => {
  const buildTeamSelect = () => {
    container.style.background = `url(./assets/space.jpg)`;
    container.innerHTML = teamSelect;

    const rebels = container.querySelector(".rebels");
    const empire = container.querySelector(".empire");

    const clickHandeler = (team) => {
      //make sure clearDOM happens before notify or it will clear the updated screen.
      clearDOM();
      teamObserver.notify(team);
    };

    rebels.addEventListener("click", () => {
      clickHandeler("Rebels");
    });

    empire.addEventListener("click", () => {
      clickHandeler("Empire");
    });
  };

  const clearDOM = () => {
    container.innerHTML = "";
  };

  return { buildTeamSelect };
};

export default TeamSelectDom;
