//API: https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast
//API: http://www.omdbapi.com/?t=inception&y=&plot=short&r=json


/* document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('movies-list');
  const API_KEY = 'f6b1657f'
  const SEARCH_QUERY = 'fast';
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(SEARCH_QUERY)}`

  function createPosterElement({ Title, Year, Poster }) {
    const wrap = document.createElement('div');
    wrap.className = 'poster-card';

    const img = document.createElement('img');
    img.className = 'poster';
    img.alt = `${Title} (${Year}) poster`;
    img.loading = 'lazy';
    img.src = Poster && Poster !== 'N/A' ? Poster : 'placeholder-poster.png'
    
    wrap.appendChild(img);

    return wrap;
  }

  async function loadPosters() {
    try{
      container.innerHTML = '<p>Loading posters...</p>';
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Network error: ${res.status}`);
      const data = await res.json();

      if (data.Response === 'False' || !Array.isArray(data.Search)) {
        container.textContent = data.Error || 'No results';
        return;
      }

      container.innerHTML = ''
      data.Search.forEach(item => {
        if (item.Poster && item.Poster !== 'N/A') {
          container.appendChild(createPosterElement(item));
        }
      });
      if (container.children.length === 0) {
        container.textContent = 'No posters available';
      }
    } catch (err) {
      console.error(err);
      container.textContent = 'Failed to load posters: ' + err.message;
    }
  }
  loadPosters();
}) */

document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = 'f6b1657f';
  const DEFAULT_SEARCH = 'fast';

  const container = document.getElementById('movies-list');
  const input = document.getElementById('select-input');
  const selectBtn = document.getElementById('select-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let items = [];
  let selectedIndex = -1;

  function createPosterElement(item, index) {
    const wrap = document.createElement('div');
    wrap.className = 'poster-card'
    wrap.tabIndex = 0;
    wrap.dataset.index = index;
    wrap.dataset.imdbid = item.imbdID || '';
    wrap.dataset.title = item.Title || '';

    const img = document.createElement('img');
    img.className = 'poster';
    img.alt = `${item.Title} (${item.Year}) poster`;
    img.loading = 'lazy';
    img.src = (item.Poster && item.Poster !== 'N/A') ? item.Poster : 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300"><rect width="100%" height="100%" fill="%23ddd"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="16">No+Poster</text></svg>';

    wrap.appendChild(img);

    wrap.addEventListener('click', () => {
      selectByIndex(index, true)
    });

    wrap.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        selectByIndex(index, true);
      }
    });
    return wrap;
  }
  function renderList(list) {
    container.innerHTML = '';
    items = Array.isArray(list) ? list : [];
    selectIndex = -1;
    if (!items.length) {
      container.textContent = 'No posters found.';
      return;
    }
    items.forEach((item, idx) => {
      if (item && item.Poster && item.Poster !== 'N/A') {
        container.appendChild(createPosterElements(item, idx));
      }
    });
    if (!container.children.length) {
      container.textContent = 'No posters available.';
    } else {
      selectByIndex(0);
    }
  }
  function selectByIndex(idx, scrollIntoView = false) {
    const cards = Array.from(container.querySelectorAll('.poster-card'));
    
    if(!cards.length) return;
    idx = Math.max(0, Math.min(cards.length - 1, idx));
    cards.forEach(c => c.classList.remove('selected'));
    const card = cards[idx];
    
    if (!card) return;
    card.classList.add('selected');
    selectedIndex = idx;

    if (scrollIntoView) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }
  prevBtn.addEventListener('click', () => {
    selectByIndex(selectedIndex - 1, true);
  });
  nextBtn.addEventListener('click', () => {
    selectByIndex(selectedIndex + 1, true);
  });
  container.addEventListener('wheel', (ev) => {
    ev.preventDefault();
    if(ev.deltaY < 0) {
      selectByIndex(selectedIndex - 1, true);
    } else if (ev.deltaY > 0) {
      selectByIndex(selectedIndex + 1, true);
    }
  }, { passive: false});
  
})