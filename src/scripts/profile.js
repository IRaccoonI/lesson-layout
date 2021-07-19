function timedelta(to, from) {
  let diff = to - from;
  let ms = Math.floor((diff % 1000) / 10);
  let s = Math.floor(diff / 1000) % 60;
  let m = Math.floor(diff / 1000 / 60);

  return {
    milliseconds: ms,
    seconds: s,
    minutes: m,
  };
}

function formatTimeDelta(obj) {
  return (
    ("0" + obj.minutes.toString()).slice(-2) +
    ":" +
    ("0" + obj.seconds.toString()).slice(-2) +
    ":" +
    ("0" + obj.milliseconds.toString()).slice(-2)
  );
}

export function registerHeader(document) {
  let profileNavEls = document.querySelectorAll(
    "#profile-header .left-content > *"
  );
  let curProfileNavEl = document.querySelector(
    "#profile-header .left-content > .note.active"
  );
  let curProfileNavElInd = 0;
  profileNavEls.forEach((el, ind) => {
    if (el == curProfileNavEl) curProfileNavElInd = ind;
  });
  let profileMain = document.querySelector("#profile-main");
  profileMain.style["left"] = -curProfileNavElInd * 100 + "%";
  profileNavEls.forEach((el, ind) => {
    el.addEventListener("click", () => {
      profileMain.style["left"] = -ind * 100 + "%";
    });
  });
}

export function registerShowHide(document) {
  // show/hide activity element
  document.querySelectorAll(".show-hide-elem").forEach((elem) => {
    let header_height = elem.querySelector(".header").clientHeight;
    let info_arrow = elem.querySelector(".header .arrow");
    let elem_height = undefined;
    elem.querySelector(".show-hide-click").addEventListener("click", (info) => {
      if (elem_height == undefined) {
        elem_height = elem.clientHeight;
        elem.style.height = elem_height + "px";
      }
      if (elem.clientHeight != header_height) {
        elem.style.height = header_height + "px";
        info_arrow.classList.add("turn");
      } else {
        elem.style.height = elem_height + "px";
        info_arrow.classList.remove("turn");
      }
    });
  });
}

export function registerTimer(document, openDateTime) {
  let timerValEl = document.getElementById("profile-timer-val");
  if (timerValEl) {
    let interval = setInterval(() => {
      let curTimeDelta = timedelta(Date.now(), openDateTime);
      let curTimeDeltaStr = formatTimeDelta(curTimeDelta);
      timerValEl.innerText = curTimeDeltaStr;
      if (!document.getElementById("profile-timer-val")) {
        clearInterval(interval);
      }
    }, 25);
  }
}

const { Loader } = require("google-maps");
const options = {};

export function registerMaps(document) {
  const loader = new Loader(false, options);
  loader.load().then(function (google) {
    const map = new google.maps.Map(document.getElementById("google-map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
}
