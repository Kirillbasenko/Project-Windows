import checkNumInputs from "./checkNumInputs";
function forms(state){
   const forms = document.querySelectorAll("form"),
         inputs = document.querySelectorAll("input");

   checkNumInputs("input[name='user_phone']");

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

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

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
export default forms;