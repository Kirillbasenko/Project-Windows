/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/changeModalState.js":
/*!********************************************!*\
  !*** ./src/js/modules/changeModalState.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkNumInputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkNumInputs */ "./src/js/modules/checkNumInputs.js");

const changeModalState = (state) => {
   const windowForm = document.querySelectorAll(".balcon_icons_img"),
         windowWidth = document.querySelectorAll("#width"),
         windowHeight = document.querySelectorAll("#height"),
         windowType = document.querySelectorAll("#view_type"),
         windowProfile = document.querySelectorAll(".checkbox");

   (0,_checkNumInputs__WEBPACK_IMPORTED_MODULE_0__["default"])("#width");
   (0,_checkNumInputs__WEBPACK_IMPORTED_MODULE_0__["default"])("#height");

   function bindActionToElems (event, elem, prop){
      elem.forEach((item, index) => {
      item.addEventListener(event, () => {
         switch (item.nodeName) {
            case "SPAN":
               state[prop] = index;
               break;
            case "INPUT":
               if(item.getAttribute("type") === "checkbox"){
                  index === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
                  elem.forEach((box, j) => {
                     box.checked = false;
                     if(index == j){
                        box.checked = true;
                     }
                  });
               } else{
                  state[prop] = item.value;
               }
               break;
            case "SELECT":
               state[prop] = item.value;
               break;
         }
         console.log(state);
      });
   });
   }

   bindActionToElems("click", windowForm, "form");
   bindActionToElems("input", windowWidth, "width");
   bindActionToElems("input", windowHeight, "height");
   bindActionToElems("change", windowType, "type");
   bindActionToElems("change", windowProfile, "profile");
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (changeModalState);

/***/ }),

/***/ "./src/js/modules/checkNumInputs.js":
/*!******************************************!*\
  !*** ./src/js/modules/checkNumInputs.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const checkNumInputs = (selector) => {
   const numInputs = document.querySelectorAll(selector);
   numInputs.forEach(item => {
            item.addEventListener("input", () => {
               item.value = item.value.replace(/\D/, "");
            });
         });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checkNumInputs);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkNumInputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checkNumInputs */ "./src/js/modules/checkNumInputs.js");

function forms(state){
   const forms = document.querySelectorAll("form"),
         inputs = document.querySelectorAll("input");

   (0,_checkNumInputs__WEBPACK_IMPORTED_MODULE_0__["default"])("input[name='user_phone']");

   const message = {
      loading: "Загрузка",
      success: "Спасибо! Скоро мы с вами свяжемся",
      failure: "Что-то пошло не так..."
   };
   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = "";
      });
   };
   const postData = async (url, data) => {
      document.querySelector('.status').textContent = message.loading;
      let res = await fetch(url, {
            method: "POST",
            body: data
      });

      return await res.text();
   };
   forms.forEach(item => {
      item.addEventListener("submit", (e) => {
         e.preventDefault();
         let statusMessage = document.createElement("div");
         statusMessage.classList.add("status");
         item.appendChild(statusMessage);

         const formData = new FormData(item);
         if(item.getAttribute("data-calt") === "end"){
            for(let key in state){
               formData.append(key, state[key]);
            }
         }

         postData("assets/server.php", formData)
         .then(res => {
            console.log(res);
            statusMessage.textContent = message.success;
         })
         .catch(() => statusMessage.textContent = message.failure)
         .finally(() => {
            clearInputs();
            setTimeout(() => {
               statusMessage.remove();
            }, 5000);
         });
      });
   });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/images.js":
/*!**********************************!*\
  !*** ./src/js/modules/images.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const images = () => {
   const imgPopup = document.createElement("div"),
         workSection = document.querySelector(".works"),
         bigImage = document.createElement("img");
   
   imgPopup.classList.add("popup");
   workSection.appendChild(imgPopup);

   imgPopup.style.justifyContent = "center";
   imgPopup.style.alignItems ="center";
   imgPopup.style.display ="none";

   imgPopup.appendChild(bigImage);

   workSection.addEventListener("click", (e) => {
      e.preventDefault();

      let target = e.target;

      if (target && target.classList.contains("preview")){
         imgPopup.style.display = "flex";
         document.body.style.overflow = "hidden";
         bigImage.style.width = "50%";
         bigImage.style.height = "60%";
         const path = target.parentNode.getAttribute("href");
         bigImage.setAttribute("src", path);
      }
      if (target && target.matches("div.popup")){
         imgPopup.style.display ="none";
         document.body.style.overflow = "";
      }
   });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (images);

/***/ }),

/***/ "./src/js/modules/modals.js":
/*!**********************************!*\
  !*** ./src/js/modules/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modals = () => {
   function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

      trigger.forEach(item => {
            item.addEventListener('click', (e) => {
               if (e.target) {
                  e.preventDefault();
               }

               windows.forEach(item => {
                  item.style.display = 'none';
               });
   
               modal.style.display = "block";
               document.body.style.overflow = "hidden";
               document.body.style.marginRight = `${scroll}px`;
                // document.body.classList.add('modal-open');
            });
      });

      close.addEventListener('click', () => {
            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            // document.body.classList.remove('modal-open');
      });

      modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
               windows.forEach(item => {
                  item.style.display = 'none';
               });

               modal.style.display = "none";
               document.body.style.overflow = ""; 
               document.body.style.marginRight = `0px`;
                // document.body.classList.remove('modal-open');
            }
      });
   }

   function showModalByTime(selector, time) {
      setTimeout(function() {
            document.querySelector(selector).style.display = 'block';
            document.body.style.overflow = "hidden";
      }, time);
   }

   function calcScroll(){
      let div = document.createElement("div");

      div.style.width = "50px";
      div.style.height = "50px";
      div.style.overflowY = "scroll";
      div.style.visibility = "hidden";

      document.body.appendChild(div);
      let scrolWidth = div.offsetWidth - div.clientWidth;
      div.remove();
      return scrolWidth;
   }

   bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
   bindModal('.phone_link', '.popup', '.popup .popup_close');
   bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
   bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
   bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup', 60000);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (headerSelector, tabSelector, contentSelector, activeClass, display = "block")  {
   const header = document.querySelector(headerSelector),
         tab = document.querySelectorAll(tabSelector),
         content = document.querySelectorAll(contentSelector);

   function hideTabContent() {
      content.forEach(item => {
            item.style.display = 'none';
      });

      tab.forEach(item => {
            item.classList.remove(activeClass);
      });
   }

   function showTabContent(i = 0) {
      content[i].style.display = display;
      tab[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   header.addEventListener('click', (e) => {
      const target = e.target;
      if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) || 
      target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
               if (target == item || target.parentNode == item) {
                  hideTabContent();
                  showTabContent(i);
               }
            });
      }
   });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine){
   function getTimeRemaining(endtime){
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
      return {
         "total": t,
         "days": days,
         "hours": hours,
         "minutes": minutes,
         "seconds": seconds,
      };
   }
   
   function getZero(num){
      if(num >= 0 && num < 10){
         return `0${num}`;
      } else{
         return num;
      }
   }
   function setClock(selector, endtime){
      const timer = document.querySelector(selector),
            days = document.querySelector("#days"),
            hours = document.querySelector("#hours"),
            minutes = document.querySelector("#minutes"),
            seconds = document.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock(){
         const t = getTimeRemaining(endtime);
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         
         if(t.total <= 0){
            days.innerHTML = "00";
            hours.innerHTML = "00";
            minutes.innerHTML = "00";
            seconds.innerHTML = "00";
            clearInterval(timeInterval);
         }
      }
   }
   setClock(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./src/js/modules/modals.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_images__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/images */ "./src/js/modules/images.js");
/* harmony import */ var _modules_changeModalState__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/changeModalState */ "./src/js/modules/changeModalState.js");






window.addEventListener("DOMContentLoaded", () =>{
   let modalState = {};
   (0,_modules_changeModalState__WEBPACK_IMPORTED_MODULE_5__["default"])(modalState);
   (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])("#timer", "2022-07-12");
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])(modalState);
   (0,_modules_images__WEBPACK_IMPORTED_MODULE_4__["default"])();
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', "inline-block");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map