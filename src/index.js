import "./style.css";

const container = document.querySelector(".container");
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
    container.remove(intro);
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
  container.remove(intro);
};
