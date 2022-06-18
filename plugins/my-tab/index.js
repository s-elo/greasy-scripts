// init timer
(() => {
  const timeDom = document.getElementById("time");
  const dateDom = document.getElementById("date");

  setInterval(() => {
    const time = new Date(Date.now());

    timeDom.innerHTML = `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`;

    dateDom.innerHTML = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}`;
  }, 1000);
})();

const selector = document.getElementById("engine-selector");
const selections = document.getElementById("engine-selections");
const engines = document.getElementsByClassName("img-li");
const searchInput = document.getElementById("search-input");

class GlobalInfo {
  constructor() {
    const localInfo = window.localStorage.getItem("info");
    if (localInfo) {
      this.currentEngineInfo = JSON.parse(localInfo);
    } else {
      this.currentEngineInfo = {
        engineIcon: "./imgs/Bing.ico",
        searchFormat: "https://www.bing.com/search?q=%s",
      };
    }

    this.init();
  }

  init() {
    const currentEngine = selector.querySelector("#current-engine");

    currentEngine.setAttribute("src", this.currentEngineInfo.engineIcon);
  }

  getInfo = () => this.currentEngineInfo;

  setInfo = (key, value) => {
    if (this.currentEngineInfo[key]) {
      this.currentEngineInfo[key] = value;

      // update localStorage
      window.localStorage.setItem(
        "info",
        JSON.stringify(this.currentEngineInfo)
      );
    }
  };
}

const { getInfo, setInfo } = new GlobalInfo();

selector.addEventListener("click", (e) => {
  e.stopPropagation();
  selections.classList.toggle("show");
});

selections.addEventListener("click", (e) => {
  const selectedEngine = e.target.querySelector("img");
  const currentEngine = selector.querySelector("#current-engine");

  // switch the icon
  currentEngine.setAttribute("src", selectedEngine.getAttribute("src"));
  setInfo("searchFormat", selectedEngine.getAttribute("search-format"));
  setInfo("engineIcon", selectedEngine.getAttribute("src"));
});

document.addEventListener("keydown", (e) => {
  // input need to be focused
  if (
    e.key !== "Enter" ||
    searchInput !== document.activeElement ||
    searchInput.value.trim() === ""
  )
    return;

  const searchUrl = getInfo().searchFormat.replace("%s", searchInput.value);

  // open a new window
  window.open(searchUrl);
  // window.location.href = csearchUrl;
});

document.addEventListener("click", () => {
  selections.classList.remove("show");
});
