/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { createBook } from '../../api/BookService';
import NavBar from '../../components/NavBar';

const HomePage = () => {
  const [newTitle, setTitle] = useState('');
  const [newAuthor, setAuthor] = useState('');
  const [newYear, setYear] = useState('');
  const [error, setError] = useState('');

  const handleCreateBook = () => {
    createBook({
      Title: newTitle,
      Author: newAuthor,
      Year: newYear,
    });
  };

  // const handleAddBook = async () => {
  //   const title = (document.getElementById('new-book-title-input') as HTMLInputElement).value;
  //   const author = (document.getElementById('new-book-author-input') as HTMLInputElement).value;
  //   const year = (document.getElementById('new-book-Year-input') as HTMLInputElement).value;

  //   if (!title || !author || !year) {
  //     setError('Please fill in all fields');
  //     return;
  //   }

  //   const success = await createBook({ title, author, year });

  //   if (success) {
  //     alert('Book Added');
  //   } else {
  //     setError('Failed to Add Book');
  //   }
  // };

  return (
    <div className="">
      <NavBar />
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Home</h1>
        <div className="p-4 flex flex-col items-end">
          <div className="my-4 flex items-center">
            <label htmlFor="new-book-title-input" className="mr-2">
              Title:{' '}
            </label>
            <input
              type="text"
              id="new-book-title-input"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4 flex items-center">
            <label htmlFor="new-book-author-input" className="mr-2">
              Author:{' '}
            </label>
            <input
              type="text"
              id="new-book-author-input"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e: any) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4 flex items-center">
            <label htmlFor="new-book-Year-input" className="mr-2">
              Year:{' '}
            </label>
            <input
              type="text"
              id="new-book-Year-input"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e: any) => setYear(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg text-md"
            onClick={handleCreateBook}>
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
