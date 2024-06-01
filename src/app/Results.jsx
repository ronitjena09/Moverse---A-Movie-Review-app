import React from "react";
import Card from "@/components/Card";

function Results({ data }) {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-w-6xl mx-auto py-4 ">
      {data.map((result, index) => (
        <Card key={index} result={result} />
      ))}
    </div>
  );
}

export default Results;
