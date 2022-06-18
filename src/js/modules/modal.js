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
export default modal;
export {closeModal};
export {openModal};