//API: https://www.omdbapi.com/?i=tt3896198&apikey=f6b1657f&s=fast

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('movies-list');

  function renderMovie(movie) {
    const el = document.createElement('div');
    el.className = 'movie';
    el.innerHTML = `
      <h4>${escapeHtml(movie.title)}</h4>
      <p>${escapeHtml(movie.overview || '')}<p>
    `;
    return el
  }
})