//Movement Animation to happen

const card = document.querySelector(".card");
const containerr = document.querySelector(".containerr");

//Moving animation event
containerr.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;

  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

//Animate In
containerr.addEventListener("mouseenter", (e) => {
  card.style.transition = "all .1s ease-in";
});
//Animate Out
containerr.addEventListener("mouseleave", (e) => {
  card.style.transition = "all .5s ease";
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

//searchForm
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".cardd");
const container = document.querySelector(".container");
let searchQuery = "";

const APP_ID = "a1bc5e82";
const APP_key = "56464dc299f66e7dc06e122ce0c5df8c";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;

  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=15`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `

    <div class="col carddd">
    <div class="cards_item">
      <div class="card_item_desc">
        <img src="${result.recipe.image}" alt="ice_cream2" />
        <h5>${result.recipe.label}</h5>
        <p>${result.recipe.calories.toFixed(2)} Calories</p>
      </div>
      <div class="card_line">&nbsp;</div>
      <div class="card_item_descL">
        <div class="card_item_desc_recipe">
          <h5>Source by:</h5>
          <p>${result.recipe.source}</p>
        </div>
        <div class="card_item_desc_cta">
          <a class="btn btn-outline-dark" href="${
            result.recipe.url
          }" target="_blank">View Recipe</a>
        </div>
      </div>
    </div>
  </div>
    `;
  });

  searchResultDiv.innerHTML = generatedHTML;
}
