const { addBookHandler, findAllBooksHandler, findBookByIdHandler, updateBookByIdHandler, deleteBookByIdHandler } = require("./handler")

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler
    },
    {
        method: 'GET',
        path: '/books',
        handler: findAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: findBookByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler,
    },
]

module.exports = routes