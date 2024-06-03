// src/components/MovieLists.jsx
import React from 'react';

const MovieLists = ({ lists }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Your Movie Lists</h2>
      <ul>
        {lists.map((list, index) => (
          <li key={index} className="border p-2 mb-2">
            {list.name} ({list.isPublic ? 'Public' : 'Private'})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieLists;
