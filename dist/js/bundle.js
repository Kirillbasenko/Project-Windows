/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function forms(){
   const forms = document.querySelectorAll("form"),
         inputs = document.querySelectorAll("input"),
         phoneInputs = document.querySelectorAll("input[name='user_phone']");

         phoneInputs.forEach(item => {
            item.addEventListener("input", () => {
               item.value = item.value.replace(/\D/, "");
            });
         });

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

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData("http://localhost:3000/requests", json)
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

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId){
      const modal = document.querySelector(modalSelector);
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      if(modalTimerId){
         clearInterval(modalTimerId);
      }
   }
   function closeModal(modalSelector){
      const modal = document.querySelector(modalSelector);
      modal.classList.add("hide");
      modal.classList.remove("show");
      document.body.style.overflow = "";
   }
function modal(triggerSelector, modalSelector, modalTimerId, closeClickOverlay = true){
   const modalTrigger = document.querySelectorAll(triggerSelector),
         modal = document.querySelector(modalSelector),
         modalCloseBtn = document.querySelectorAll("[data-close]"),
         windows = document.querySelectorAll("[data-modal]");
   modalTrigger.forEach(btn => {
      btn.addEventListener("click", () => {
         windows.forEach(item => {
            item.classList.add("hide")
         });
         openModal(modalSelector, modalTimerId);
      } 
      );
   });
   modalCloseBtn.forEach(item => {
      item.addEventListener("click", () => {
         windows.forEach(item => {
            item.classList.add("hide")
         });
         closeModal(modalSelector);
      } 
   )
   });
   modal.addEventListener("click", (e) =>{
      if (e.target === modal && closeClickOverlay){
         windows.forEach(item => {
            item.classList.add("hide")
         });
         closeModal(modalSelector);
      }
   });
   document.addEventListener("keydown", (e) =>{
      if(e.code === "Escape"  && modal.classList.contains("show")){
         closeModal(modalSelector);
      }
   });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



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
            windows = document.querySelectorAll('[data-modal]');

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
                // document.body.classList.add('modal-open');
            });
      });

      close.addEventListener('click', () => {
            windows.forEach(item => {
               item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            // document.body.classList.remove('modal-open');
      });

      modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
               windows.forEach(item => {
                  item.style.display = 'none';
               });

               modal.style.display = "none";
               document.body.style.overflow = ""; 
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
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");





window.addEventListener("DOMContentLoaded", () =>{
   /*const modalTimerId = setTimeout(() => openModal(".popup", modalTimerId), 60000);
   modal(".popup_engineer_btn", ".popup_engineer");
   modal(".phone_link", ".popup", modalTimerId);
   modal(".popup_calc_btn", ".popup_calc");
   modal(".popup_calc_button", ".popup_calc_profile", "", false);
   modal(".popup_calc_profile_button", ".popup_calc_end", "", false);*/
   (0,_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])("#timer", "2022-07-12");
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])();
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', "inline-block");
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map