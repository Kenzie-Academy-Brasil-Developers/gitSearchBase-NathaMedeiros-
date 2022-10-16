const myHeader = localStorage.getItem("retorno");
const parseMyHeader = JSON.parse(myHeader);

function renderHeader(arr) {
  const tagHeader = document.querySelector(".header");

  const divCardHeader = document.createElement("div");
  divCardHeader.classList.add("divCardHeader");

  const img = document.createElement("img");
  img.src = arr.avatar_url;

  const divProfile = document.createElement("div");
  divProfile.classList = "div-profile";

  const tagH2 = document.createElement("h2");
  tagH2.innerText = arr.name;

  const tagP = document.createElement("p");
  tagP.innerText = arr.bio;

  const divBt = document.createElement("div");
  divBt.classList = "divBt-header";

  const btEmail = document.createElement("button");
  btEmail.classList = "bt-email";
  btEmail.innerText = "Email";

  const btChangeUser = document.createElement("button");
  btChangeUser.classList = "bt-changeUser";
  btChangeUser.innerText = "Trocar usuario";
  btChangeUser.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.replace("../../index.html");
  });
  divCardHeader.append(img, divProfile);
  
  divProfile.append(tagH2, tagP);
  divBt.append(btEmail, btChangeUser);
  tagHeader.append(divCardHeader, divBt);
}
renderHeader(parseMyHeader);

async function renderCard() {
  const repo = await renderRepo(parseMyHeader);
  const tagUl = document.querySelector(".ulCards");
  repo.forEach((element) => {
    const divCards = document.createElement("div");
    divCards.classList.add("divCards");

    const li = document.createElement("li");
    li.classList.add("cardsList");

    const tagH1 = document.createElement("h1");
    tagH1.innerText = element.name;

    const tagP = document.createElement("p");
    tagP.innerText = element.description;

    const div = document.createElement("div");
    div.classList.add("divCards-bt");

    const btrepository = document.createElement("button");
    btrepository.classList.add("bt-repository");

    const btDemo = document.createElement("button");
    btDemo.classList.add("bt-demo");

    const aDemo = document.createElement("a");
    aDemo.href = element.homepage;
    aDemo.innerText = "Demo";
    aDemo.target = "_blank";

    const aRepository = document.createElement("a");
    aRepository.href = element.svn_url;
    aRepository.innerText = "Repositorio";
    aRepository.target = "_blank";

    btDemo.appendChild(aDemo);
    btrepository.appendChild(aRepository);
    div.append(btrepository, btDemo);
    li.append(tagH1, tagP, div);
    divCards.appendChild(li);
    tagUl.appendChild(divCards);
  });
}
renderCard();

async function renderRepo(elt) {
  const linkAPI = await fetch(`https://api.github.com/users/${elt.login}/repos`)
    .then((response) => response.json())
    .then((responseJson) => responseJson);

  return linkAPI;
}

