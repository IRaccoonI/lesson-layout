document.write("Hello");

// nav slider
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
    profileNavEls.forEach((el) => {
      el.classList.remove("active");
    });
    profileNavEls[ind].classList.add("active");
  });
});

// show/hide activity element
document.querySelectorAll(".show-hide-elem").forEach((elem) => {
  let headerHeight = elem.querySelector(".header").clientHeight;
  let infoArrow = elem.querySelector(".header .arrow");
  let elemHeight = undefined;
  elem.querySelector(".show-hide-click").addEventListener("click", (info) => {
    if (elemHeight == undefined) {
      elemHeight = elem.clientHeight;
      elem.style.height = elemHeight + "px";
    }
    if (elem.clientHeight != headerHeight) {
      elem.style.height = headerHeight + "px";
      infoArrow.classList.add("turn");
    } else {
      elem.style.height = elemHeight + "px";
      infoArrow.classList.remove("turn");
    }
  });
});
