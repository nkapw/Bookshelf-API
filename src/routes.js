const addBook = require('./handlers/addBook');
const deleteBookById = require('./handlers/deleteBookById');
const findAllBooks = require('./handlers/findAllBook');
const findBookById = require('./handlers/findBookById');
const updateBookById = require('./handlers/updateBookById');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: findAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: findBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
