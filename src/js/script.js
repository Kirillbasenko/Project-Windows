import modal from "./modules/modal";
import timer from "./modules/timer";
import forms from "./modules/forms";
import tabs from "./modules/tabs";
import {openModal} from "./modules/modal";
window.addEventListener("DOMContentLoaded", () =>{
   const modalTimerId = setTimeout(() => openModal(".popup", modalTimerId), 60000);
   modal(".popup_engineer_btn", ".popup_engineer", modalTimerId, false);
   modal(".phone_link", ".popup", modalTimerId);
   modal(".popup_calc_btn", ".popup_calc");
   timer("#timer", "2022-07-12");
   forms();
   tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
   tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
   tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', "inline-block");
});