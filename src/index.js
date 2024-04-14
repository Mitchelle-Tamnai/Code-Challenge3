// Your code here


let url = ''

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

function buyTicket(films) {
    fetch(`http://localhost:3000/films/${films.id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(films)
    })
    .then(resp => resp.json())
    .then(updatedFilms => {
        console.log(updatedFilms);
      
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors appropriately
    });
}

const button = document.querySelector('#buy-ticket');
let films = {
    id: 1, 
    capacity: 30, 
    tickets_sold: 27 
};

button.addEventListener('click', () => {
    let remTicketsElement = document.querySelector('#ticket-num');
    let remTickets = parseInt(remTicketsElement.textContent); // Parse the text content to a number
    if (remTickets > 0) {
        remTickets -= 1;
        remTicketsElement.textContent = remTickets;
        films.tickets_sold += 1; // Update tickets sold
        buyTicket(films); // Send PATCH request
    } else {
        alert('Movie Sold Out');
    }
});

function deleteFilms(id) {
    fetch(`http://localhost:3000/films/${id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(films => console.log(films))
}

const deletebtn = document.querySelector('#delete')

deletebtn.addEventListener('click', () =>{
    list.innerHTML = ''
    deleteFilms(films.id)

})

