import React from "react";
import Results from "./Results";
const API_KEY = process.env.API_KEY;

async function fetchMovieData(title) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?t=${encodeURIComponent(
            title
          )}&apikey=${API_KEY}`,
          { next: { revalidate: 10 } }
        );
        const data = await res.json();
        console.log(data,"data");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        // console.log(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    }, 200); // Delay of 2 seconds
  });
}

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";

  let data = [];
  const fetchTopRatedMovies = [
    "Beautiful Disaster",
    "The Garfield Movie",
    "Furiosa: A Mad Max Saga",
    "Haikyuu!! The Dumpster Battle",
    "Fast X",
    "Dunkirk",
    "Blade Runner 2049",
    "Baby Driver",
    "Wind River",
    "American Made",
    "Logan Lucky",
    "The Big Sick",
    "the boss baby",
    "The Meyerowitz Stories",
  ];
  
  const fetchTrendingMovies = [
    "The Idea of You",
    "Anyone But You",
    "Laapataa Ladies",
    "Challengers",
    "Love Lies Bleeding",
    "Bridgerton",
    "The Fall Guy",
    "Transformers: Rise of the Beasts",
    "Wish",
    "Aquaman and the Lost Kingdom",
    "Joker",
    "Furiosa: A Mad Max Saga",
    "Atlas",
    "Hachi: A Dog's Tale",
    "Godzilla x Kong: The New Empire",
  ];

  if (genre === "fetchTopRated") {
    for (let movie of fetchTopRatedMovies) {
      const movieData = await fetchMovieData(movie);
      data.push(movieData);
    }
  } else if (genre === "fetchTrending") {
    for (let movie of fetchTrendingMovies) {
      const movieData = await fetchMovieData(movie);
      data.push(movieData);
    }
  } else {
    const movieData = await fetchMovieData(genre);
    data.push(movieData);
  }

  return <Results data={data} />;
}
