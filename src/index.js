// Your code here

const poster = document.getElementById('poster')
const title = document.getElementById('title')
const runTime = document.getElementById('runtime')
const showTime = document.getElementById('showtime')
const tickets = document.getElementById('ticket-num')
const description = document.getElementById('film-info')

function getFirstMovieDetails() {
    fetch('http://localhost:3000/films/1')
    .then(resp => resp.json())
    .then(film => {

        const remTickets = film.capacity - film.tickets_sold

        poster.src = film.poster
        title.innerText = film.title
        runTime.innerText = film.runtime
        showTime.innerText = film.showtime
        description.innerText = film.description
        tickets.innerText = remTickets

    })
    
}
getFirstMovieDetails()

function getMovieTitles() {
    const filmList = document.querySelector('#films')

    fetch('http://localhost:3000/films')
    .then(resp => resp.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const list = document.createElement('li')
            list.innerHTML = `
                <li>${data[i].title}</li>
            `
            filmList.appendChild(list)
        }

    })
   
}
getMovieTitles()
