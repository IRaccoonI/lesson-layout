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
  let header_height = elem.querySelector(".header").clientHeight;
  let info_arrow = elem.querySelector(".header .arrow");
  let elem_height = undefined;
  console.log(elem.clientHeight);
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
