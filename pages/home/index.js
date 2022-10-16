const form = document.querySelector(".formSeach");
const input = document.querySelector(".input-user");
const btSearch = document.querySelector(".bt-search");

const inputFilter = (input) => {
  let elt = true;
  if (input.value == "") {
  }
  return elt;
};

input.addEventListener('keyup', () => {
    if (myInput(input)){
        btSearch.disabled = false;
        btSearch.style.background='rgba(214,51,108,1)'
        btSearch.style.color= 'rgba(255,255,255,1)'
        btSearch.style.cursor='pointer'
    }else{
        btSearch.disabled = true;
        btSearch.style.background='rgba(214,51,108,0.4)'
        btSearch.style.color= 'rgba(255,255,255,0.35)'
        btSearch.style.cursor='default'
    }
})

async  function renderAPI(usuario) {
    const api = await fetch(`https://api.github.com/users/${usuario}`)
       .then(response => {
          console.log(response)
          btSearch.innerHTML=`<img src='/assests/spinner.png' class='loading'>`
          if(response.status == 200) {
            setTimeout(() =>{
               window.location.replace("./pages/profile/index.html")
            },3000)
            

          }else {
             const span = document.querySelector(".notFound");
             
             setTimeout(() => {
               btSearch.innerText="Ver perfil do gitHub"
               notFoundRender()
               
             }, 3000);
          }
          return response.json()
       })
       .then(responseJson => responseJson)
 
    return api
 }

 
 async function myInput() {
    form.addEventListener("submit", async event => {
       event.preventDefault();
       const inputValue = input.value
       const resposta = await renderAPI(inputValue)
       const respostaJson = JSON.stringify(resposta)
          if(!resposta.message){
          localStorage.setItem("retorno", respostaJson)
                
          }
    })
 }
 myInput()
 
 function notFoundRender() {
    const span = document.querySelector(".notFound");
 
    span.innerHTML = "";
    span.innerText = "Usuário não encontrado";
 }

 