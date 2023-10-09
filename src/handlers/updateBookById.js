const books = require('../books');

const updateBookById = (request, h) => {
  const {bookId} = request.params;

  const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;


  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    return h.response({

      'status': 'fail',
      'message': 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      'status': 'fail',
      'message': 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  } else {
    return h.response({
      'status': 'fail',
      'message': 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
  }
};


module.exports = updateBookById;
