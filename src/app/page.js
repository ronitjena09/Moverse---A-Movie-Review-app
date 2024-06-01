import React from "react";
import Results from "./Results";
const API_KEY = process.env.API_KEY;
const proxy = "http://cors-anywhere.herokuapp.com/";

async function fetchMovieData(title) {
  const res = await fetch(
    `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  console.log(data);
  return data;
}

export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchTrending";

  let data;
  if (genre === "fetchTopRated") {
    data = await fetchMovieData("Wind River");
    data = await fetchMovieData("Logan");
    data = await fetchMovieData("The Meyerowitz Stories");
    data = await fetchMovieData("Thor: Ragnarok");
    data = await fetchMovieData("coco");
    data = await fetchMovieData("Baby Driver");
    data = await fetchMovieData("Dunkirk");
    data = await fetchMovieData("The Big Sick");
    data = await fetchMovieData("American Made");
    data = await fetchMovieData("Logan Lucky");
    data = await fetchMovieData("Blade Runner 2049");
    data = await fetchMovieData("the boss baby");
  } else if (genre === "fetchTrending") {
    data = await fetchMovieData("Brave Enough");
    data = await fetchMovieData("Two Mothers");
    data = await fetchMovieData("Boys on Film 16: Possession");
    data = await fetchMovieData("Halt! Los!");
    data = await fetchMovieData("The Survivor Grounds");
    data = await fetchMovieData("Jake & Eddie");
    data = await fetchMovieData("Foot Stretcher");
    data = await fetchMovieData("Escape from Candyland");
    data = await fetchMovieData(
      "Magnetic Highway: The Rise, Fall, and Resurgence of the Independent Video Store"
    );
    data = await fetchMovieData("Wear");
    data = await fetchMovieData("Walter Pfeiffer: Chasing Beauty");
  } else {
    data = await fetchMovieData(genre);
    console.log(fetchTrending);
  }

  return <Results data={data} />;
}
