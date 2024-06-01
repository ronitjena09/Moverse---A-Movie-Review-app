import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiStar } from "react-icons/ci";

export default function Card({ result }) {
  return (
    <div className="card group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${result.imdbID}`}>
        <Image
          src={result.Poster}
          alt={result.Title}
          width={200}
          height={300}
          className="card-image sm:rounded-t-lg group-hover:opacity-75 w-full duration-300"
        />
        <div className="card-content p-2">
          <p className="line-clamp-2 text-md">{result.Plot}</p>
          <h2 className="text-lg font-bold truncate">{result.Title}</h2>
          <p className="color-gray-600">{result.Year}  {result.Runtime} </p>
          <p className="flex gap-1 "><CiStar  />{result.imdbRating} ({result.imdbVotes}) </p>
        </div>
      </Link>
    </div>
  );
}
