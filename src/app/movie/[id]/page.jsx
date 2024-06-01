import Image from "next/image";
import React from "react";
const API_KEY = process.env.API_KEY;

export default async function Movie({ params }) {
  const imdbID = params.id;

  const res = await fetch(
    `http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${API_KEY}`
  );
  const movie = await res.json();

  console.log(movie);

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={movie.Poster}
          width={500}
          height={300}
          className="rounded-lg"
          alt={movie.Title}
          style={{maxWidth: '100%', height: '100%'}}
        />
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">{movie.Title}</h2>
          <p className="text-lg mb-3">{movie.Plot}</p>
          <p>
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.Released}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.imdbRating} ({movie.imdbVotes} votes)
          </p>
        </div>
      </div>
    </div>
  );
}
