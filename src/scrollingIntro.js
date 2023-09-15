const ScrollingIntro = (container, introObserver) => {
  const intro = container.querySelector("iframe");

  window.focus();

  window.addEventListener("load", () => {
    const clientX = document.documentElement.clientWidth;
    const clientY = document.documentElement.clientHeight;
    intro.setAttribute("width", clientX - 40);
    intro.setAttribute("height", clientY - 40);
  });

  window.addEventListener("resize", () => {
    const clientX = document.documentElement.clientWidth;
    const clientY = document.documentElement.clientHeight;
    intro.setAttribute("width", clientX - 40);
    intro.setAttribute("height", clientY - 40);
  });

  document.addEventListener("keydown", removeIntro, true);

  window.addEventListener("blur", () => {
    setTimeout(() => {
      if (document.activeElement == intro) {
        setTimeout(() => {
          removeIntro({ key: "Escape" });
        }, 92000);
      }
    });
  });

  let singleTrigger = false;

  function removeIntro(e) {
    if (!singleTrigger && e.key === "Escape") {
      container.innerHTML = "";
      introObserver.notify(true);

      document.removeEventListener("keydown", removeIntro, true);
      singleTrigger = true;
    }
  }

  return { removeIntro };
};

export default ScrollingIntro;
