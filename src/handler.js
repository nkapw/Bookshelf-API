const { nanoid } = require("nanoid");
const books = require("./books");

// const addBookHandler = (request, h) => {
//     const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

//     const id = nanoid(16);
//     const insertedAt = new Date().toISOString();
//     const updatedAt = insertedAt;

//     const finished = pageCount === readPage ? true : false;

//     const newBook = {
//         id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
//     };
//     books.push(newBook);

//     const isSuccess = books.filter((book) => book.id === id).length > 0;

//     if (!name) {
//         const response = h.response({

//             "status": "fail",
//             "message": "Gagal menambahkan buku. Mohon isi nama buku"

//         });
//         response.code(400);
//         return response;
//     }

//     if (readPage > pageCount) {
//         const response = h.response({
//             "status": "fail",
//             "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
//         });
//         response.code(400);
//         return response;
//     }

//     if (isSuccess) {
//         const response = h.response({
//             "status": "success",
//             "message": "Buku berhasil ditambahkan",
//             "data": {
//                 "bookId": id
//             }
//         });

//         response.code(201);

//         return response;
//     }


// };


const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const id = nanoid();
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt: insertedAt,
    };

    books.push(newBook)

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201);
}




const findAllBooksHandler = (request, h) => {

    // const simplifiedBooks = books.map(book => ({
    //     id: book.id,
    //     name: book.name,
    //     publisher: book.publisher,
    // }));
    // console.log(simplifiedBooks);
    // if (books.length === 0) {

    //     console.log('buku kosong?', books);
    //     const response = h.response({
    //         status: 'success',
    //         data: {
    //             books: []
    //         },
    //     })
    //     return response
    // } else {

    //     const response = h.response({
    //         status: 'success',
    //         data: {
    //             books: simplifiedBooks
    //         },
    //     })
    //     return response
    // }

    if (books.length === 0) {
        return h.response({
            status: "success",
            data: {
                books: []
            }
        });
    }
    const simplifiedBooks = books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));
    return h.response({
        status: "success",
        data: {
            books: simplifiedBooks
        }
    });

};


const findBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        })

        return response

    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;



    const updatedAt = new Date().toISOString();

    if (name === undefined) {
        const response = h.response({

            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        });
        response.code(404);
        return response;
    }


};


const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((buku) => buku.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    findAllBooksHandler,
    findBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};

