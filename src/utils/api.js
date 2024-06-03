// src/utils/api.js
export async function fetchMovieData(imdbID) {
    const API_KEY = process.env.API_KEY;
    const res = await fetch(
      `http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${API_KEY}`
    );
    const movieData = await res.json();
    return movieData;
  }
  