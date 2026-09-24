//API: https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast
//API: http://www.omdbapi.com/?t=inception&y=&plot=short&r=json
//const url =  'https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast'

//DOM Refs
/* const moviesList = document.getElementById('movies-list');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('select-input');
const searchBtn = document.getElementById('select-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const API_KEY = 'f6b1657f';
let currentQuery = 'fast';
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;

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

const list = document.getElementById('movies-list');
list.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    //list.scrollLeft += e.deltaY;
    e.preventDefault();
  }
})

// state
let currentResults = []; //store data.search here
let currentSort = 'default';

function compareStrings(a, b) {
  return String(a).localeCompare(String(b), undefined, {
    sensitivity: 'base', numeric: true
  });
}

function compareYears(a, b) {
  const pa = parseInt(String(a).match(/\d{4}/)?.[0] || '0', 10);
  const pb = parseInt(String(b).match(/\d{4}/)?.[0] || '0', 10);
  return pa - pb;
}

function sortedResults(arr, sortKey) {
  const copy = arr.slice();
  switch (sortKey) {
    case 'title-asc':
      copy.sort((x, y) => compareStrings(x.Title, y.Title));
      break;
    case 'title-desc':
      copy.sort((x, y) => compareStrings(y.Title, x.Title));
      break;
    case 'year-asc':
      copy.sort((x, y) => compareYears(x.Year, y.Year) || compareStrings(x.Title, y.Title));
      break;
    case 'year-desc':
      copy.sort((x, y) => compareYears(y.Year, x.Year) || compareStrings(y.Title, x.Title));
      break;
    default:
      break;
  }
  return copy;
}

function renderMoviesFromState() {
  moviesList.innerHTML = '';

  if (!currentResults || currentResults.length === 0) {
    moviesList.innerHTML = '<p>No results found.</p>';
    return;
  }

  const toRender = sortedResults(currentResults, currentSort);
  const frag = document.createDocumentFragment();

  toRender.forEach(item => {
    const card = document.createElement('div');
    card.className = 'poster-card'
    card.dataset.imdbid = item.imdbID;

    const img = document.createElement('img');
    img.className = 'poster';
    img.alt = item.Title;
    img.src = item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/160x240?text=No+Poster';

    const title = document.createElement('div');
    title.className = 'poster-title';
    title.textContent = `${item.Title} (${item.Year})`;

    card.appendChild(img);
    card.appendChild(title);
  });
  moviesList.appendChild(frag);
}

async function searchAndRender(query = currentQuery, page =currentPage) {
  try {
    const data = await fetchMovies(query, page);
    if (data && Array.isArray(data.Search)) {
      currentResults = data.Search.slice(); 
      renderMoviesFromState();
    } else {
      currentResults = [];
      renderMoviesFromState();
    }
  } catch (err) {
    console.error(err);
    moviesList.innerHTML = '<p>Failed to load movies</p>'
  }
}

sortSelect.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderMoviesFromState();
});

 */

// app.js - pagination-ready OMDb client

const API_KEY = 'f6b1657f';

// DOM refs
const moviesList = document.getElementById('movies-list');
const sortSelect = document.getElementById('sort-select'); // may be null if not in HTML
const searchInput = document.getElementById('select-input');
const searchBtn = document.getElementById('select-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator'); // optional element to display page status

// state
let currentQuery = 'fast';
let currentPage = 1;
let totalPages = 1;
let totalResults = 0;
let currentResults = [];
let currentSort = 'default';

// helper: fetch a page
async function fetchMovies(query = 'fast', page = 1) {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error: ' + res.status);
  const data = await res.json();
  return data;
}

// helper: update the prev/next buttons and optional page indicator
function updatePaginationUI() {
  if (prevBtn) prevBtn.disabled = currentPage <= 1;
  if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
  if (pageIndicator) pageIndicator.textContent = `Page ${currentPage} of ${totalPages} (${totalResults} results)`;
}

// simple comparators for optional sorting
function compareStrings(a, b) {
  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base', numeric: true });
}
function compareYears(a, b) {
  const pa = parseInt(String(a).match(/\d{4}/)?.[0] || '0', 10);
  const pb = parseInt(String(b).match(/\d{4}/)?.[0] || '0', 10);
  return pa - pb;
}
function sortedResults(arr, sortKey) {
  const copy = arr.slice();
  switch (sortKey) {
    case 'title-asc': copy.sort((x, y) => compareStrings(x.Title, y.Title)); break;
    case 'title-desc': copy.sort((x, y) => compareStrings(y.Title, x.Title)); break;
    case 'year-asc': copy.sort((x, y) => compareYears(x.Year, y.Year) || compareStrings(x.Title, y.Title)); break;
    case 'year-desc': copy.sort((x, y) => compareYears(y.Year, x.Year) || compareStrings(x.Title, y.Title)); break;
    default: break;
  }
  return copy;
}

// render from state (efficient)
function renderMoviesFromState() {
  moviesList.innerHTML = '';

  if (!currentResults || currentResults.length === 0) {
    moviesList.innerHTML = '<p>No results found.</p>';
    return;
  }

  const toRender = sortedResults(currentResults, currentSort);
  const frag = document.createDocumentFragment();

  toRender.forEach(item => {
    const card = document.createElement('div');
    card.className = 'poster-card';
    card.dataset.imdbid = item.imdbID || '';

    const img = document.createElement('img');
    img.className = 'poster';
    img.alt = item.Title || 'Poster';
    img.src = item.Poster && item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/160x240?text=No+Poster';

    const title = document.createElement('div');
    title.className = 'poster-title';
    title.textContent = `${item.Title || 'Unknown'} (${item.Year || '—'})`;

    card.appendChild(img);
    card.appendChild(title);

    frag.appendChild(card);
  });

  moviesList.appendChild(frag);
}

// main: fetch current page and update state/UI
async function searchAndRender(query = currentQuery, page = currentPage) {
  try {
    // show a minimal loading state
    moviesList.innerHTML = '<p>Loading…</p>';

    const data = await fetchMovies(query, page);
    // OMDb returns Response: "False" and Error message on failure
    if (!data || data.Response === 'False') {
      currentResults = [];
      totalResults = 0;
      totalPages = 1;
      renderMoviesFromState();
      console.warn('OMDb API returned error:', data && data.Error);
      return;
    }

    // store results and pagination info
    currentResults = Array.isArray(data.Search) ? data.Search : [];
    totalResults = parseInt(data.totalResults || '0', 10) || currentResults.length;
    totalPages = Math.max(1, Math.ceil(totalResults / 10)); // OMDb returns 10 results per page
    currentPage = page; // ensure state matches requested page

    // render and update pagination UI
    renderMoviesFromState();
    updatePaginationUI();
  } catch (err) {
    console.error('Fetch/render error:', err);
    moviesList.innerHTML = '<p>Failed to load movies. See console for details.</p>';
  }
}

// event wiring (safe optional chaining)
searchBtn?.addEventListener('click', () => {
  currentQuery = searchInput.value.trim() || 'fast';
  currentPage = 1;
  searchAndRender(currentQuery, currentPage);
});
searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    currentQuery = searchInput.value.trim() || 'fast';
    currentPage = 1;
    searchAndRender(currentQuery, currentPage);
  }
});
prevBtn?.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    searchAndRender(currentQuery, currentPage);
  }
});
nextBtn?.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    searchAndRender(currentQuery, currentPage);
  }
});
sortSelect?.addEventListener('change', (e) => {
  currentSort = e.target.value;
  renderMoviesFromState();
});

// initial load
document.addEventListener('DOMContentLoaded', () => {
  updatePaginationUI();
  searchAndRender(currentQuery, currentPage);
});

const wrapper = document.querySelector('.wrapper');
const btnFind = document.querySelector('.btn__find')
const iconClose = document.querySelector('.icon-close')

btnFind.addEventListener('click', () => {
  wrapper.classList.add('active')
})

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active')
})

const list = document.getElementById('movies-list');
list.addEventListener('wheel', (e) => {
  if(Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    //list.scrollLeft += e.deltaY;
    e.preventDefault();
  }
})