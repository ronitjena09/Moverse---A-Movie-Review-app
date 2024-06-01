import Results from "@/app/Results";
import React from "react";

const API_KEY = process.env.API_KEY;

export default async function SearchPage({ params }) {
  const searchTerm = params.searchTerm;
  const res = await fetch(
    `http://www.omdbapi.com/?s=${encodeURIComponent(
      searchTerm
    )}&apikey=${API_KEY}&page=1`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  if (data.Response === "False") {
    return <h1 className="text-center pt-6">No results found</h1>;
  }

  const results = data.Search;
  return (
    <div>
      {results.length === 0 ? (
        <h1 className="text-center pt-6">No results found</h1>
      ) : (
        <Results data={results} />
      )}
    </div>
  );
}
