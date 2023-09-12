const ScrollingIntro = (container, introObserver) => {
  const intro = container.querySelector("iframe");

  window.focus();

  window.addEventListener("load", () => {
    const clientX = document.documentElement.clientWidth;
    const clientY = document.documentElement.clientHeight;
    intro.setAttribute("width", clientX - 40);
    intro.setAttribute("height", clientY - 40);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      removeIntro();
    }
  });

  window.addEventListener("blur", () => {
    setTimeout(() => {
      if (document.activeElement == intro) {
        setTimeout(removeIntro, 92000);
      }
    });
  });

  const removeIntro = () => {
    container.innerHTML = "";
    introObserver.notify(true);
  };

  return { removeIntro };
};

export default ScrollingIntro;
