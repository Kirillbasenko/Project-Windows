import modals from "./modules/modals";
import timer from "./modules/timer";
import forms from "./modules/forms";
import tabs from "./modules/tabs";
import images from "./modules/images";
import changeModalState from "./modules/changeModalState";
window.addEventListener("DOMContentLoaded", () =>{
   let modalState = {};
   changeModalState(modalState);
   modals();
   timer("#timer", "2022-07-12");
   forms(modalState);
   images();
   tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
   tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
   tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', "inline-block");
});