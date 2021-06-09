const app = {
  init: () => {
    document.addEventListener("deviceready", app.ready);
  },
  ready: () => {
    document.querySelector(".alert").addEventListener("click", app.showAlert);
    document
      .querySelector(".confirm")
      .addEventListener("click", app.showConfirm);
    document.querySelector(".prompt").addEventListener("click", app.showPrompt);
  },
  showAlert: (event) => {
    let p = event.currentTarget;
    navigator.notification.alert("thanks Buddy ", () => {
      p.style.backgroundColor = "gold";
    });
  },
  showConfirm: (event) => {
    let buttons = ["Yapp Gotcha", "Not yet"];
    let p = event.currentTarget;
    navigator.notification.confirm(
      "Friday is comming. what are your plans?",
      (responseIndex) => {
        p.innerHTML = `<br/> you clicked on
        ${buttons[responseIndex - 1]}`;
      },
      "Plans for Friday",
      buttons
    );
  },
  showPrompt: (event) => {
    let buttons = ["confirm", "cancel"];
    let p = event.currentTarget;
    navigator.notification.prompt(
      "who is the prisident of united states? ",
      (response) => {
        p.innerHTML = `<br/> you said ${response.input1}`;
      },
      "Politic",
      buttons,
      "not Trump Right?"
    );
  },
};
app.init();

async function fetchApi() {
  const url = "https://fakestoreapi.com/products";
  console.log(url)
  let response = await fetch(url);
  let result = await response.json();
  return result;
}

function displayProducts(dataJson) {
  let resultItems = document.querySelector(".result-items");
  for (let i = 0; i < dataJson.length; i++) {
    let sectionEl = document.createElement("section");
    sectionEl.classList.add("container");
    resultItems.appendChild(sectionEl);
    sectionEl.innerHTML = `
    <img class="image" src="${dataJson[i].image}"
    alt="${dataJson[i].title}">
   `;
  }
}
document.querySelector("#fetch-btn")
.addEventListener("click", async (event) => {
    event.preventDefault();
    let dataJson = await fetchApi();
    displayProducts(dataJson);
  });
console.log('hello')
