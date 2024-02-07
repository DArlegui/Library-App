/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BookType, createBook, getUserBooks, deleteBook } from '../../api/BookService';
import NavBar from '../../components/NavBar';

const HomePage = () => {
  const [book, setBook] = useState<BookType>({ id: 0, img_url: '', title: '', author: '', year: 0 });
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBooks = await getUserBooks();
      console.log(fetchedBooks);
      setBooks(fetchedBooks.books);
    };

    fetchData();
  }, []);

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
    window.location.reload();
    return;
  };

  const handleDeleteBook = async (id: number) => {
    const result = await deleteBook(id);
    console.log(result);
    window.location.reload();
    return;
  };

  return (
    <div className="">
      <NavBar />
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">Home</h1>
        <div className="p-4 flex flex-col items-end">
          <div className="my-4 flex items-center">
            <label htmlFor="new-book-img_url-input" className="mr-2">
              Img_Url:{' '}
            </label>
            <input
              type="text"
              id="new-book-img_url-input"
              className="border border-gray-300 rounded-md p-2"
              onChange={(e) =>
                setBook((b) => ({
                  ...b,
                  img_url: e.target.value,
                }))
              }
            />
          </div>
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
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold underline mb-2">Books</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((b: BookType, i: number) => (
              <div key={i} className="p-4 border rounded-lg shadow-md bg-white relative">
                <img src={b.img_url} alt={b.title} className="w-[224px] h-[340px] object-cover rounded-md" />
                <div className="text-xl font-bold mb-2 mt-2">{b.title}</div>
                <div className="text-lg text-gray-600 mb-2">{b.author}</div>
                <div className="text-lg text-gray-600">{b.year}</div>
                <button
                  className="absolute bottom-3 right-2 hover:underline text-red font-bold p-1 rounded-lg text-sm mt-2"
                  onClick={() => handleDeleteBook(b.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
