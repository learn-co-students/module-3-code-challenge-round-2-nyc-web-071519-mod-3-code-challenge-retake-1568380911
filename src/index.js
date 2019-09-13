const allBeers = "http://localhost:3000/beers"
const beerList = document.querySelector('.list-group')
const beerDetail = document.getElementById('beer-detail')
const beer = document.querySelector('.list-group-item')


fetch(allBeers)
  .then(response => response.json())
  .then(beers => {
      beers.forEach(beer => {
          const str = ` <ul class="list-group">
                        <li class="list-group-item" data-beer=${beer.id}>${beer.name}</li>
                        </ul> `
          beerList.insertAdjacentHTML("beforeend", str)        
      });
    
  })


beerList.addEventListener('click', e => {
    debugger
    if (e.target.className == e.target.dataset.beer) {

    }
    
})

//   fetch("http://localhost:3000/beers/:id")




