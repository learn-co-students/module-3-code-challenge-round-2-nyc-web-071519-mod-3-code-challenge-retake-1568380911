window.addEventListener('DOMContentLoaded', function() {
    const beerList = document.querySelector("#list-group")
    const beerDeatail = document.querySelector("#beer-detail")

    // fetch all 
    fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(data => {
        beers = data
        // console.log(beers[0].name)

        for(let i = 0; i < beers.length; i++){
            const title = beers[i].name
            const tagline = beers[i].tagline
            const description = beers[i].description
            const img = beers[i].image_url
            const id = beers[i].id

            console.log(title)

            const list = `
                <li class="list-group-item" id="item-${id}">${title}</li>
            `
            beerList.insertAdjacentHTML("beforeend", list)

            // get details
            const btn = document.querySelector(`#item-${id}`)
            btn.addEventListener("click", function(e){
                console.log("BEER")

                beerDeatail.innerHTML = ``
                
                beerDeatail.innerHTML = `
                    <h1>${title}</h1>
                    <img src=${img}>
                    <h3>${tagline}</h3>
                    <textarea id="description-${id}">${description}</textarea>
                    <button id="edit-beer-${id}" class="btn btn-info">
                        Save
                    </button>
                `

                // const beerDeets = `
                //     <h1>${name}</h1>
                //     <img src=${img}>
                //     <h3>${tagline}</h3>
                //     <textarea>${description}</textarea>
                //     <button id="edit-beer" class="btn btn-info">
                //         Save
                //     </button>
                // `

                // beerDeatail.insertAdjacentHTML("beforeend", beerDeets)

                const saveButton = document.querySelector(`#edit-beer-${id}`)
                const txtHTML = document.querySelector(`#description-${id}`)
                

                saveButton.addEventListener("click", function(e){
                    console.log("ckick")

                    const text = document.querySelector(`#description-${id}`).value
                    console.log(text)
                    

                    const txt = {
                        "description": text
                    }

                    fetch(`http://localhost:3000/beers/${id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(txt)

                    })
                    .then(response => response.json())
                    // update in textarea (updates on referesh)
                    
                })
            })
        }
    })
});