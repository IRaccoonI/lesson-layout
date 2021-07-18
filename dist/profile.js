/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/profile.js":
/*!************************!*\
  !*** ./src/profile.js ***!
  \************************/
/***/ (() => {

eval("document.write(\"Hello\");\n\n// nav slider\nlet profileNavEls = document.querySelectorAll(\n  \"#profile-header .left-content > *\"\n);\nlet curProfileNavEl = document.querySelector(\n  \"#profile-header .left-content > .note.active\"\n);\nlet curProfileNavElInd = 0;\nprofileNavEls.forEach((el, ind) => {\n  if (el == curProfileNavEl) curProfileNavElInd = ind;\n});\nlet profileMain = document.querySelector(\"#profile-main\");\nprofileMain.style[\"left\"] = -curProfileNavElInd * 100 + \"%\";\nprofileNavEls.forEach((el, ind) => {\n  el.addEventListener(\"click\", () => {\n    profileMain.style[\"left\"] = -ind * 100 + \"%\";\n    profileNavEls.forEach((el) => {\n      el.classList.remove(\"active\");\n    });\n    profileNavEls[ind].classList.add(\"active\");\n  });\n});\n\n// show/hide activity element\ndocument.querySelectorAll(\".show-hide-elem\").forEach((elem) => {\n  let header_height = elem.querySelector(\".header\").clientHeight;\n  let info_arrow = elem.querySelector(\".header .arrow\");\n  let elem_height = undefined;\n  elem.querySelector(\".show-hide-click\").addEventListener(\"click\", (info) => {\n    if (elem_height == undefined) {\n      elem_height = elem.clientHeight;\n      elem.style.height = elem_height + \"px\";\n    }\n    if (elem.clientHeight != header_height) {\n      elem.style.height = header_height + \"px\";\n      info_arrow.classList.add(\"turn\");\n    } else {\n      elem.style.height = elem_height + \"px\";\n      info_arrow.classList.remove(\"turn\");\n    }\n  });\n});\n\n\n//# sourceURL=webpack://lesson-layout/./src/profile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/profile.js"]();
/******/ 	
/******/ })()
;