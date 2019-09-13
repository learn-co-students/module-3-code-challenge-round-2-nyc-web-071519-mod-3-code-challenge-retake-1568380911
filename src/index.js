document.addEventListener("DOMContentLoaded", function() {

    let beerGroup = document.getElementById("list-group")
    let allBeers = []
    let beerDetail = document.getElementById("beer-detail")


    fetch(`http://localhost:3000/beers`, {method: "GET"})
        .then(response => response.json())
        .then(beerArray => {

            allBeers = beerArray

            allBeers.forEach(beer => {

                beerGroup.insertAdjacentHTML("beforeend", `
                <ul class="list-group">
                <li id="title" data-id=${beer.id} class="list-group-item">${beer.name}</li>
                </ul>
                `)
            })
        })

        beerGroup.addEventListener("click", event => {
            beerDetail.innerHTML = ""
            if (event.target.id === "title"){
                // console.log("title was clicked")}
                const foundTitle = allBeers.find(title => {
                    return title.id === parseInt(event.target.dataset.id)
                })
                console.log (foundTitle)
            
                const string = `
                <h1>${foundTitle.name}</h1>
                <img src=${foundTitle.image_url}/>
                <h3>${foundTitle.tagline}</h3>
                <textarea>${foundTitle.description}</textarea>
                <button id="edit-beer" data-id="${foundTitle.id}" class="btn btn-info"> Save </button>
                `
    
                beerDetail.insertAdjacentHTML("beforeend", string)
            }
        })
        
        beerDetail.addEventListener("click", event => {

            // console.log(beerDetail.)
            // event.target.dataset.id
            // console.log(desc)
            if(event.target.id === "edit-beer"){
                
                let desc = document.querySelector("textarea").value
                

                let id = parseInt(event.target.dataset.id)
                console.log(id)

                fetch(`http://localhost:3000/beers/${id}`, {method: "PATCH",
                
                    headers:   {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },

                    body: JSON.stringify({
                        description: desc
                    })
                })
                .then(response => response.json())
            }

        })
})