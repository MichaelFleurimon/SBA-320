import React, { useEffect, useState } from "react";
import BookList from "./bookList";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const API_KEY = "YOUR_GOOGLE_BOOKS_API_KEY"; // Replace with your API key
  const AUTHOR = "Mark Twain";

  useEffect(() => {
    // Fetch book data from Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${AUTHOR}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setBooks(data.items);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="App">
      <h1>Books by Mark Twain</h1>
      <BookList books={books} />
    </div>
  );
}

export default App;