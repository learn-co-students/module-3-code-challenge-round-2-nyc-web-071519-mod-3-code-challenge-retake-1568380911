document.addEventListener("DOMContentLoaded", () => {
  // URL
  const beerURL = "http://localhost:3000/beers";

  // ARRAY OF BEERS
  beersCollection = [];

  // DOM ELEMENTS
  const list = document.getElementById("list-group");
  const beerContainer = document.getElementById("beer-detail");

  // SAVE EVENT LISTENER / DETAILS ACTION
  beerContainer.addEventListener("click", e => {
    if (e.target.dataset.action === "save") {
      let foundBeer = beersCollection.find(b => {
        return b.id === parseInt(e.target.dataset.id);
      });
      //  FIND SPECIFIC TEXT AREA USING ID WITH INTERPOLATED ID#
      const beerInput = document.getElementById(`input-${foundBeer.id}`);
      //   FIND INDEX POSITION OF FOUND BEER TO UPDATE OBJECT'S DESCRIPTION
      let indexPos = beersCollection.findIndex(b => b.id === foundBeer.id);
      //   UPDATE OBJECT'S DESCRIPTION
      beersCollection[indexPos].description = beerInput.value;
      //   CREATE OBJECT + PATCH REQUEST
      let newDetails = {
        description: beerInput.value
      };
      fetch(beerURL + `/${foundBeer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(newDetails)
      })
        .then(response => response.json())
        .then(data => {
          //  PESSIMISTICALLY RENDER
          beerInput.innerHTML = data.description;
        });
    }
  });

  // LIST EVENT LISTENER / BEER ACTIONS
  list.addEventListener("click", e => {
    // EMPTY BEER CONTAINER BEFORE RENDERING EACH NEW ITEM
    beerContainer.innerHTML = "";
    // FIND BEER
    let brew = beersCollection.find(b => {
      return b.id === parseInt(e.target.dataset.id);
    });
    // CREATE HTML TO APPEND
    let details = `
        <h1>${brew.name}</h1>
        <img src=${brew.image_url}>
        <h3>${brew.tagline}</h3>
        <h5>Goes well with:</h5>
        <ul id="food-pair"></ul>
        <h5>D E S C R I P T I O N :</h5>
        <textarea id="input-${brew.id}" data-id=${brew.id} style="margin-bottom: 1em;">${brew.description}</textarea>
        <button id="edit-beer-${brew.id}" data-id=${brew.id} class="btn btn-info" data-action="save">Save</button>`;

    // APPEND TO THE DOM
    beerContainer.insertAdjacentHTML("beforeend", details);
    const foodList = document.getElementById("food-pair");

    brew.food_pairing.forEach(f => {
      const list = `
            <li>${f}</li>
        `;
      foodList.insertAdjacentHTML("beforeend", list);
    });
  });

  // INITIAL FETCH
  fetch(beerURL)
    .then(resp => resp.json())
    .then(data => {
      beersCollection = data;
      data.forEach(e => {
        const card = `
                   <li class="list-group-item" id="list-item-${e.id}" data-id=${e.id}>${e.name}</li>
              `;
        list.insertAdjacentHTML("beforeend", card);
      });
    });
});
