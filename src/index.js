window.addEventListener("DOMContentLoaded", event => {
  console.log("DOM fully loaded and parsed");
  let beerDetail = document.querySelector(".list-group");
  let beerList = document.querySelector("body > div > div.col-md-4");
  let beerDet = document.querySelector("#beer-detail");
  fetch("http://localhost:3000/beers").then(function(response) {
    response.json().then(function(beers) {
      console.log(beers);

      beers.forEach(beer => {
        beerDetail.insertAdjacentHTML(
          "afterend",
          `<li id = ${beer.id} class="list-group-item">${beer.name}</li>`
        );
      });
    });
  });

  beerList.addEventListener("click", function(e) {
    // console.log(e.target.id);

    fetch(`http://localhost:3000/beers/${e.target.id}`).then(function(
      response
    ) {
      response.json().then(function(data) {
        // console.log(data);
        beerDet.innerHTML = "";
        beerDet.insertAdjacentHTML(
          "beforeend",
          `<h1>${data.name}</h1>
        <img src="${data.image_url}">
        <h3>${data.tagline}</h3>
        <textarea data-id= ${data.id}>${data.description}</textarea>
        <button data-id= ${data.id} id="edit-beer" class="btn btn-info">
          Save
        </button>`
        );
      });
    });

    beerDet.addEventListener("click", function(e) {
      e.preventDefault();
      if (e.target.className === "btn btn-info") {
        // console.log(e.target);
        let description = document
          .querySelector("#beer-detail")
          .querySelector("textarea").textContent;
        fetch(`http://localhost:3000/beers/${parseInt(e.target.dataset.id)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            description: description
          })
        }).then(function(response) {
          response.json().then(function(data) {
            console.log(data);
          });
        });
      }
    });
  });
});
