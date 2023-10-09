const books = require('../books');

const findAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;
  const filteredBooks = books.filter((book) => {
    const nameMatch = !name || book.name.toLowerCase().includes(name.toLowerCase());
    const readingMatch = reading === undefined || book.reading === (reading === '1');
    const finishedMatch = finished === undefined || book.finished === (finished === '1');
    return nameMatch && readingMatch && finishedMatch;
  });
  if (filteredBooks.length === 0) {
    return h.response({
      status: 'success',
      data: {
        books: [],
      },
    }).code(200);
  }

  const bookResponse = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return h.response({
    status: 'success',
    data: {
      books: bookResponse,
    },
  }).code(200);
};

module.exports = findAllBooks;
