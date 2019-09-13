document.addEventListener("DOMContentLoaded", () => {
    let beers = [];
    const listGroup = document.querySelector("#list-group");
    const beerDetail = document.querySelector("#beer-detail");

    beerDetail.addEventListener("click", e => {
        const descriptionInput = document.querySelector("#description-input");
        const h1 = document.querySelector("h1");
        // debugger
        if (e.target.id === "edit-beer") {
            const foundBeer = beers.find(beer => beer.id === parseInt(h1.id));
            foundBeer.description = descriptionInput.value;
            fetch(`http://localhost:3000/beers/${foundBeer.id}`, {
                method: 'PATCH',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({description: foundBeer.description})
            });
            // .then(rsp => rsp.json())
            // .then(patchedBeer => {
            //     // debugger
            //     descriptionInput.value = patchedBeer.description;
            //     debugger
            // });
        }
    });

    listGroup.addEventListener("click", e => {
        // console.log(e.target.id)
        const foundBeer = beers.find(beer => beer.id === parseInt(e.target.id));
        // console.log(foundBeer)
        // debugger
        beerDetail.innerHTML = `
            <h1 id="${foundBeer.id}">${foundBeer.name}</h1>
            <img src="${foundBeer.image_url}">
            <h3>${foundBeer.tagline}</h3>
            <textarea id="description-input">${foundBeer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
             Save
            </button>`;
    });

    // console.log("loaded")
    fetch("http://localhost:3000/beers")
    .then(rsp => rsp.json())
    .then(beersArray => {
        beers = beersArray;
        // console.log(beers);
        beers.forEach(beer => {
            const beerBullet = document.createElement("li");
            beerBullet.class = "list-group-item";
            beerBullet.id = beer.id;
            beerBullet.innerText = beer.name;
            listGroup.appendChild(beerBullet);
        })
    });
});