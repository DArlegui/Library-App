/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { BookType, createBook, getUserBooks, deleteBook, updateBook } from '../../api/BookService';
import NavBar from '../../components/NavBar';
import InputLabel from '../../components/InputLabel';

const HomePage = () => {
  const [book, setBook] = useState<BookType>({ id: 0, img_url: '', title: '', author: '', year: 0 });
  const [editBook, setEditBook] = useState<BookType>({ id: 0, img_url: '', title: '', author: '', year: 0 });
  const [error, setError] = useState('');
  const [books, setBooks] = useState([]);

  const [editBookId, setEditBookId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const fetchedBooks = await getUserBooks();
    console.log(fetchedBooks);
    setBooks(fetchedBooks.books);
  };

  const handleCreateBook = async () => {
    if (isNaN(book.year)) {
      setError('Year must be a number');
      return;
    }

    if (!book.title || !book.author || !book.year) {
      setError('Please fill in all fields');
      return;
    }

    await createBook(book);
    await fetchBooks();
  };

  const handleDeleteBook = async (id: number) => {
    await deleteBook(id);
    await fetchBooks();
  };

  const handleEditBook = (id: number) => {
    const bookToEdit = books.find((b: BookType) => b.id === id);
    if (bookToEdit) {
      setEditBook(bookToEdit);
      setEditBookId(id);
      setIsEditing(true);
    }
  };

  const handleUpdateBook = async (id: number, book: BookType) => {
    updateBook(id, {
      id: id,
      img_url: book.img_url,
      title: book.title,
      author: book.author,
      year: book.year,
    });

    setIsEditing(false);
    setEditBookId(0);
    await fetchBooks();
  };

  return (
    <div className="">
      <NavBar />
      <div className="p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold ">Home</h1>
        <div className="p-4 flex flex-col items-end">
          <InputLabel
            inputTitle="Image URL"
            changeValue={(str) => setBook((b) => ({ ...b, img_url: str.target.value }))}
          />
          <InputLabel inputTitle="Title" changeValue={(str) => setBook((b) => ({ ...b, title: str.target.value }))} />
          <InputLabel inputTitle="Author" changeValue={(str) => setBook((b) => ({ ...b, author: str.target.value }))} />
          <InputLabel
            inputTitle="Year"
            changeValue={(str) => setBook((b) => ({ ...b, year: parseInt(str.target.value, 10) }))}
          />
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
              <div key={i} className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white relative">
                <img src={b.img_url} alt={b.title} className="w-[224px] h-[340px] object-cover rounded-md" />
                <div>
                  <div className="text-xl font-bold mb-2 mt-2">{b.title}</div>
                  <div className="text-lg text-gray-600 mb-2">{b.author}</div>
                  <div className="text-lg text-gray-600">{b.year}</div>
                </div>
                {!isEditing && (
                  <div>
                    <button
                      className="absolute bottom-3 right-2 hover:underline font-bold p-1 rounded-lg text-sm mt-2"
                      onClick={() => handleDeleteBook(b.id)}>
                      Delete
                    </button>
                    <button
                      className="absolute bottom-3 right-16 hover:underline font-bold p-1 text-sm mt-2"
                      onClick={() => handleEditBook(b.id)}>
                      Edit
                    </button>
                  </div>
                )}
                {isEditing && editBookId === b.id && (
                  <div className="flex flex-col items-end">
                    <InputLabel
                      inputTitle="Image URL"
                      changeValue={(str) => setEditBook((prev) => ({ ...prev, img_url: str.target.value }))}
                      defaultValue={b.img_url}
                    />
                    <InputLabel
                      inputTitle="Title"
                      changeValue={(str) => setEditBook((prev) => ({ ...prev, title: str.target.value }))}
                      defaultValue={b.title}
                    />
                    <InputLabel
                      inputTitle="Author"
                      changeValue={(str) => setEditBook((prev) => ({ ...prev, author: str.target.value }))}
                      defaultValue={b.author}
                    />
                    <InputLabel
                      inputTitle="Year"
                      changeValue={(str) => setEditBook((prev) => ({ ...prev, year: parseInt(str.target.value, 10) }))}
                      defaultValue={b.year.toString()}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg text-md"
                      onClick={() => {
                        handleUpdateBook(b.id, editBook);
                        setEditBook({ id: 0, img_url: '', title: '', author: '', year: 0 }); // Reset the editBook state
                      }}>
                      Update
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
