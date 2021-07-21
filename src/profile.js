import {
  changeUrlQueryParam,
  getUrlQueryParam,
  deleteUrlQueryParam,
} from "./utils/url-worker.ts";

import {
  registerHeader,
  registerShowHide,
  registerTimer,
  registerMaps,
} from "./scripts/profile";

import env from "../.env";

const axios = require("axios");

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

document.getElementById("profile-header").innerHTML = htmlProfileHeader;

// ------
// ------
// global
// ------
// ------
let openDocumentDateTime = Date.now();
let templatesProfileUrl = `http://${env.HOST}:${env.PORT}/templates/profile`;
let allPagesNames = ["activity", "map", "timer"];

// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

let curPageName = getUrlQueryParam("page");
let loadProfilePage = async (name, force = false) => {
  if (curPageName == name && !force) {
    return;
  }
  curPageName = name;
  changeUrlQueryParam("page", name);
  if (name == "activity") {
    // load
    let acitvityPromise = axios.get(templatesProfileUrl + "/activity.html");

    let acitvityItemPromises = [];
    for (var i = 0; i < 2; i++) {
      acitvityItemPromises.push(
        axios.get(templatesProfileUrl + `/activity-items/${i}.html`)
      );
    }

    // insert
    document.getElementById("profile-activity").innerHTML = (
      await acitvityPromise
    ).data;
    let contentEl = document.getElementById("profile-activity-content");
    for (var i = 0; i < 2; i++) {
      contentEl.innerHTML += (await acitvityItemPromises[i]).data;
    }
  } else if (name == "map") {
    let mapPromise = axios.get(templatesProfileUrl + "/map.html");
    document.getElementById("profile-map").innerHTML = (await mapPromise).data;
    registerMaps(document);
  } else if (name == "timer") {
    let timerPromise = axios.get(templatesProfileUrl + "/timer.html");
    document.getElementById("profile-timer").innerHTML = (
      await timerPromise
    ).data;
    registerTimer(document, openDocumentDateTime);
  }

  registerShowHide(document);

  // toggle active class in profile header
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

// load default page
if (curPageName == undefined) {
  changeUrlQueryParam("page", "activity");
  curPageName = "activity";
}
loadProfilePage(curPageName, true);

// add listeners for profile header
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
