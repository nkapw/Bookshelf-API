const books = require('../books');


const deleteBookById = (request, h) => {
  const {bookId} = request.params;

  const index = books.findIndex((buku) => buku.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};
module.exports = deleteBookById;
