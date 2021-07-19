import {
  changeUrlQueryParam,
  getUrlQueryParam,
  deleteUrlQueryParam,
} from "./utils/url-worker.ts";

import {
  registerHeader,
  registerShowHide,
  registerTimer,
} from "./scripts/profile";

// -----
// -----
// base
// -----
// -----

import "@fortawesome/fontawesome-free/js/all";
import "./styles/basic.sass";
import "./styles/header.sass";
import "./styles/profile.sass";

import htmlBasic from "./templates/basic.html";
import htmlHeader from "./templates/header.html";
import htmlFooter from "./templates/footer.html";

document.body.innerHTML = htmlBasic;
document.getElementById("header").innerHTML = htmlHeader;
document.getElementById("footer").innerHTML = htmlFooter;
document.getElementById("content").innerHTML = htmlProfileBasic;

import htmlProfileBasic from "./templates/profile/basic.html";
import htmlProfileHeader from "./templates/profile/header.html";

import htmlProfileActivity from "./templates/profile/activity.html";
import htmlProfileMap from "./templates/profile/map.html";
import htmlProfileTimer from "./templates/profile/timer.html";

import htmlProfileActivity0 from "./templates/profile/activity-items/0.html";
import htmlProfileActivity1 from "./templates/profile/activity-items/1.html";

document.getElementById("profile-header").innerHTML = htmlProfileHeader;

// ------
// ------
// global
// ------
// ------

let openDocumentDateTime = Date.now();

let allPagesNames = ["activity", "map", "timer"];

let curPageName = getUrlQueryParam("page");
let loadProfilePage = (name) => {
  curPageName = name;
  changeUrlQueryParam("page", name);
  if (name == "activity") {
    document.getElementById("profile-activity").innerHTML = htmlProfileActivity;
    document.getElementById("profile-activity-content").innerHTML +=
      htmlProfileActivity0;
    document.getElementById("profile-activity-content").innerHTML +=
      htmlProfileActivity1;
  } else if (name == "map") {
    document.getElementById("profile-map").innerHTML = htmlProfileMap;
  } else if (name == "timer") {
    document.getElementById("profile-timer").innerHTML = htmlProfileTimer;
    registerTimer(document, openDocumentDateTime);
  }
  registerShowHide(document);
  document
    .querySelectorAll("div[targetUrlQuery]")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelector('div[targetUrlQuery="' + curPageName + '"]')
    .classList.add("active");
};

let unloadProfilePages = (exceptName = "") => {
  allPagesNames
    .filter((v) => v != curPageName && v != exceptName)
    .forEach((name) => {
      document.getElementById("profile-" + name).innerHTML = "";
    });
};

// ----
// ----
// main
// ----
// ----

if (curPageName == undefined) {
  changeUrlQueryParam("page", "activity");
  curPageName = "activity";
}

loadProfilePage(curPageName);

document.querySelectorAll("div[targetUrlQuery]").forEach((el) => {
  let target = el.getAttribute("targetUrlQuery");
  el.addEventListener("click", () => {
    loadProfilePage(target);
    setTimeout(() => {
      unloadProfilePages(target);
    }, 500);
  });
});

// -----------
// -----------
// register js
// -----------
// -----------

registerHeader(document);
