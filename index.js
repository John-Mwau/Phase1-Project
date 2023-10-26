
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const displayResultDiv = document.querySelector(".search-result");
    const container = document.querySelector(".container");
    let searchQuery = "";
    // used edamam free api for developers to get appId & key
    const appId = "84bee003";
    const appKey = "329155bd64ad8ebb0f33a82ffc58e501";
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      searchQuery = e.target.querySelector("input").value;
      getAPIData();
    });
  
    const getAPIData = async () => {
      //Base url containing user query,appId & appKey
      const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}&from=0&to=45`;
  
      const response = await fetch(baseURL);
      const data = await response.json();
      //hits is a key of search query & it should contain 20 recipe items
      createHTML(data.hits);
      console.log(data);
    };
    // function for generating html for display
    const createHTML = (results) => {
      let createdHTML = "";
      results.map((result) => {
        createdHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="checkout-btn" target="_top" href="${
              result.recipe.url
            }">Checkout Recipe</a>
          </div>
          <p class="item-data">Cuisine type: ${result.recipe.cuisineType}</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
      });
      displayResultDiv.innerHTML = createdHTML;
    };
  });
  