/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { BookType, createBook } from '../../api/BookService';
import NavBar from '../../components/NavBar';

const HomePage = () => {
  const [book, setBook] = useState<BookType>({ title: '', author: '', year: 0 });
  const [error, setError] = useState('');

  const handleCreateBook = async () => {
    if (!book.title || !book.author || !book.year) {
      setError('Please fill in all fields');
      return;
    }

    if (isNaN(book.year)) {
      setError('Year must be a number');
      return;
    }

    console.log(book);
    const result = await createBook(book);

    console.log(result);
    return;
  };

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
              onChange={(e) =>
                setBook((b) => ({
                  ...b,
                  title: e.target.value,
                }))
              }
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
              onChange={(e: any) =>
                setBook((b) => ({
                  ...b,
                  author: e.target.value,
                }))
              }
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
              onChange={(e: any) =>
                setBook((b) => ({
                  ...b,
                  year: e.target.value,
                }))
              }
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
