"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <form className="flex justify-between px-5 max-w-6xl mx-auto" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Keyword here"
        className="w-full h-14 rounded-md placeholder-gray-500 outline-none bg-transparent flex-1 border border-radius-1 border-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="text-green-400 disabled:text-gray-400" disabled={!search.trim()}>
        Search
      </button>
    </form>
  );
}
