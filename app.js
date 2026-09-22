//API: https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast
//API: http://www.omdbapi.com/?t=inception&y=&plot=short&r=json
const url =  'https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast'

const moviesList = document.getElementById('movies-list');
const searchInput = document.getElementById('select-input');
const searchBtn = document.getElementById('select-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const API_KEY = 'f6b1657f';
let currentQuery = 'fast';
let currentPage = 1;

async function fetchMovies(query = 'fast', page = 1) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();
  return data;
}

function clearMovies() {
  moviesList.innerHTML = '';
}

function renderMovies(data) {
  clearMovies();

  if (!data || data.Response === 'False' || !data.Search) {
    moviesList.innerHTML = '<p>No results found.</p>';
    return;
  }

  data.Search.forEach(item => {
    const card = document.createElement('div');
    card.className = 'poster-card';

    const img = document.createElement('img');
    img.className = 'poster';
    img.alt = item.Title;
    img.src = item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/160x240?text=No+Poster'

    const title = document.createElement('div')
    title.className = 'poster-title';
    title.textContent = item.Title;

    card.appendChild(img);
    card.appendChild(title);

    moviesList.appendChild(card)
  });
}

async function searchAndRender(query = currentQuery, page = currentPage) {
  try {
    const data = await fetchMovies(query, page);
    renderMovies(data);
  } catch (err) {
    console.error(err);
    moviesList.innerHTML = '<p>Failed to load movies</p>';
  }
}

searchBtn.addEventListener('click', () => {
  currentQuery = searchInput.value.trim() || 'fast';
  currentPage = 1;
  searchAndRender(currentQuery, currentPage);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    currentQuery = searchInput.value.trim() || 'fast';
    currentPage = 1;
    searchAndRender(currentQuery, currentPage);
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    searchAndRender(currentQuery, currentPage);
  }
});
nextBtn.addEventListener('click', () => {
  currentPage++;
  searchAndRender(currentQuery, currentPage);
});

document.addEventListener('DOMContentLoaded', () => {
  searchAndRender(currentQuery, currentPage)
})

const wrapper = document.querySelector('.wrapper');
const btnFind = document.querySelector('.btn__find')
const iconClose = document.querySelector('.icon-close')

btnFind.addEventListener('click', () => {
  wrapper.classList.add('active')
})

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active')
})