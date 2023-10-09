const books = require('../books');

const findBookById = (request, h) => {
  const {bookId} = request.params;

  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    });

    return response;
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};
module.exports = findBookById;
