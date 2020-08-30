const movieAPIpath = 'https://api.themoviedb.org/';
const api_key = '2c1f036f89b308fe24e88fc962356cf9';

const nowPlayingMoviesURL = new URL(movieAPIpath + '/3/movie/now_playing');
nowPlayingMoviesURL.searchParams.append('api_key', api_key);

const searchMoviesURL = new URL(movieAPIpath + '3/search/movie');
searchMoviesURL.searchParams.append('api_key', api_key);

const form = document.getElementById('search-form');
const searchBtn = document.getElementById('search-btn');

// CREATE MOVIE ELEMENT
const createMovieElement = (movie, container) => {
  const br = document.createElement('br');

  const movieElement = document.createElement('div');
  movieElement.classList.add('movie');
  container.appendChild(movieElement);

  //add poster
  const posterURL = 'https://image.tmdb.org/t/p/w185';
  const moviePoster = document.createElement('img');
  moviePoster.src = posterURL + movie.poster_path;

  //add release date
  const releaseDate = document.createElement('span');
  const releaseYear = movie.release_date.slice(0, 12);

  //add title
  const movieTitle = document.createElement('span');
  movieTitle.innerHTML = movie.title + `<br> (${releaseYear})`;
  movieTitle.classList.add('movie-title');
  releaseDate.classList.add('release-date');

  //add detail
  const detailMovie = document.createElement('button');
  detailMovie.innerHTML = "DETAIL";

  //apend elements
  movieElement.appendChild(br);
  movieElement.appendChild(moviePoster);
  movieElement.appendChild(movieTitle);
  movieElement.appendChild(releaseDate);
  movieElement.appendChild(detailMovie);

  detailMovie.addEventListener('click', () => movieSelected(movie.id));
};


// load now playing movies (home page)
const loadNowPlaying = () => {
  fetch(nowPlayingMoviesURL)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(function(movie) {
        const container = document.querySelector('.movies');
        createMovieElement(movie, container);
      });
    });
}

loadNowPlaying();

const movieSelected = (id) => {
  sessionStorage.setItem('movieID', id);
  window.location = 'hal3.html';
}

function getMovie() {
  const movieID = sessionStorage.getItem('movieID');
  const findMoviesURL = new URL(movieAPIpath + '3/movie/' + movieID);
  findMoviesURL.searchParams.append('api_key', api_key);

  const container = document.querySelector('.movie-selected');
  const posterContainer = document.querySelector('.poster');
  const movieInfo = document.querySelector('.movie-info');
  const overview = document.querySelector('.overview')
  const trailers = document.querySelector('.trailers');

  fetch(findMoviesURL)
    .then(response => response.json())
    .then(movie => {
      console.log(movie);

      //add poster
      const posterURL = 'https://image.tmdb.org/t/p/w342';
      const moviePoster = document.createElement('img');
      moviePoster.src = posterURL + movie.poster_path;

      //add title
      const movieTitle = document.createElement('h1');
      movieTitle.innerHTML = movie.title;
      movieTitle.classList.add('title');

      //add release-date
      const releaseTgl = document.createElement('span');
      const releaseTanggal = movie.release_date.slice(0, 12);
      releaseTgl.innerHTML = `<br>Release Date : ${releaseTanggal}`;
      releaseTgl.classList.add('release-date');

      // add rating
      const rating = document.createElement('span');
      rating.innerHTML = `${movie.vote_average}`;
      rating.classList.add('rating');

      // add company
      const companies = document.createElement('span');
      companies.classList.add('companies');
      // companies.innerHTML = `<br>Company : ${movie.production_companies}`;
      const companyName = () => {
        console.log(movie.production_companies[0].name);
        let outcome = [];
        for (i = 0; i < movie.production_companies.length; i++) {
          outcome.push(movie.production_companies[i].name);
        }
        const result = outcome.join(' | ');
        companies.innerHTML = `<br>Companies : ${result}`;
      };
      companyName();

      //add genres
      const genre = document.createElement('span');
      genre.classList.add('genre');

      const genreName = () => {
        console.log(movie.genres[0].name);
        let outcome = [];
        for (i = 0; i < movie.genres.length; i++) {
          outcome.push(movie.genres[i].name);
        }
        const result = outcome.join(' | ');
        genre.innerHTML = `<br>Genre : ${result}`;
      };

      genreName();

      //add runtime
      const runtime = document.createElement('span');
      runtime.classList.add('runtime');
      runtime.innerHTML = ` <i class="far fa-clock"></i> ${movie.runtime} min`;

      // add budget
      const budget = document.createElement('span');
      budget.classList.add('budget');
      budget.innerHTML = `<br>Budget : $ ${movie.budget}`;
      

      //add overview
      const movieOverview = document.createElement('p');
      movieOverview.innerHTML = movie.overview;
      movieOverview.classList.add('overview');

      //apend elements
      movieInfo.appendChild(movieTitle);
      movieInfo.appendChild(rating);
      movieInfo.appendChild(runtime);
      movieInfo.appendChild(releaseTgl);
      movieInfo.appendChild(genre);
      movieInfo.appendChild(budget);
      movieInfo.appendChild(companies);
      overview.appendChild(movieOverview);
      posterContainer.appendChild(moviePoster);

    });
}

