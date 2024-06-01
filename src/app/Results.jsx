import React from 'react';

function Results({ data }) {
  return (
    <div>
      <h1>{data.Title}</h1>
      <img src={data.Poster} alt={data.Title} />
      <p>{data.Plot}</p>
      <p>{data.Runtime}</p>
    </div>
  );
}

export default Results;
