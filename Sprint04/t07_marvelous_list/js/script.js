const films = {
    inception: {
        title: "Inception",
        poster: "assets/images/inception.jpg",
        date: "2010",
        description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., while dealing with his troubled past and subconscious.",
        actors: [
            { name: "Leonardo DiCaprio", link: "https://www.imdb.com/name/nm0000138/" },
            { name: "Joseph Gordon-Levitt", link: "https://www.imdb.com/name/nm0330687/" },
            { name: "Elliot Page", link: "https://www.imdb.com/name/nm0680983/" }
        ]
    },
    shutter_island: {
        title: "Shutter Island",
        poster: "assets/images/shutter_island.jpg",
        date: "2010",
        description: "In 1954, a U.S. Marshal investigates the disappearance of a murderer from a hospital for the criminally insane, but uncovers shocking secrets about the island and himself.",
        actors: [
            { name: "Leonardo DiCaprio", link: "https://www.imdb.com/name/nm0000138/" },
            { name: "Mark Ruffalo", link: "https://www.imdb.com/name/nm0749263/" },
            { name: "Ben Kingsley", link: "https://www.imdb.com/name/nm0001426/" }
        ]
    },
    wolf_of_wall_street: {
        title: "Wolf of Wall Street",
        poster: "assets/images/wolf_of_wall_street.jpg",
        date: "2013",
        description: "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
        actors: [
            { name: "Leonardo DiCaprio", link: "https://www.imdb.com/name/nm0000138/" },
            { name: "Jonah Hill", link: "https://www.imdb.com/name/nm1706767/" },
            { name: "Margot Robbie", link: "https://www.imdb.com/name/nm3053338/" }
        ]
    }
};

function updateFilmInfo(film) {
    document.getElementById('film-title').textContent = film.title;
    document.getElementById('film-date').textContent = film.date;
    document.getElementById('film-description').textContent = film.description;

    const actorsList = document.getElementById('film-actors');
    actorsList.innerHTML = '';
    film.actors.forEach(actor => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = actor.link;
        a.textContent = actor.name;
        a.target = "_blank";
        li.appendChild(a);
        actorsList.appendChild(li);
    });

    const posterImg = document.querySelector('#film-poster img');
    posterImg.classList.remove('disabled');
    posterImg.src = film.poster;
    posterImg.alt = film.title + " poster";
}

function resetFilmInfo() {
    document.getElementById('film-title').textContent = "Select a film";
    document.getElementById('film-date').textContent = "";
    document.getElementById('film-description').textContent = "";
    document.getElementById('film-actors').innerHTML = "";
    const posterImg = document.querySelector('#film-poster img');
    posterImg.classList.add('disabled');
    posterImg.src = "assets/images/placeholder.jpg";
    posterImg.alt = "Placeholder poster";
}

document.addEventListener('DOMContentLoaded', () => {
    resetFilmInfo();
});

document.addEventListener('click', (e) => {
    const li = e.target.closest('#film-list li');
    if (li) {
        const filmKey = li.dataset.film;
        const film = films[filmKey];
        if (film) {
            updateFilmInfo(film);
        }
    }
});
