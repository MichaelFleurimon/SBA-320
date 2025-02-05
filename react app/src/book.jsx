import React from "react";

function Book({ book }) {
  const { volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  return (
    <div className="book">
      {imageLinks && <img src={imageLinks.thumbnail} alt={title} />}
      <h2>{title}</h2>
      <p>By {authors ? authors.join(", ") : "Unknown Author"}</p>
      <p>{description ? `${description.substring(0, 150)}...` : "No description available."}</p>
    </div>
  );
}

export default Book;