import db from './../database/pool.js';
import LoggerService from '../services/logger.service.js';
import * as auditService from '../audit/audit.service.js';
import auditAction from '../audit/auditAction.js';

const loggerService = new LoggerService('book.controller');

// +[1]
export const getBooks = async (_req, res) => {
  try {
    const sql = `SELECT book_title, book_description,
                book_author, book_isbn, book_publisher,
                book_pages, store_code
                FROM books;`;

    const connection = await db.connect();

    const result = await connection.query(sql);

    loggerService.info('return book list', result.rows);

    auditService.prepareAudit(
      auditAction.GET_BOOK_LIST,
      result.rows,
      null,
      'thunder client'
    );

    return res.status(200).json({
      message: 'books list get successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: 'failed get books list' });
  }
};

// +[2]
export const createBook = async (req, res) => {
  try {
    const sql = `INSERT INTO
      BOOkS (
          book_title,
          book_description,
          book_author,
          book_isbn,
          book_publisher,
          book_pages,
          store_code,
          created_by
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING book_title,
      book_description, 
      book_author, 
      book_isbn,
      book_publisher,
      book_pages,
      store_code,
      created_by;`;

    const connection = await db.connect();

    const bookTitle = req.body.book_title;
    const bookDescription = req.body.book_description;
    const bookAuthor = req.body.book_author;
    const bookIsbn = req.body.book_isbn;
    const bookPublisher = req.body.book_publisher;
    const bookPages = req.body.book_pages;
    const storeCode = req.body.store_code;
    const createdBy = req.body.created_by;

    const values = [
      bookTitle,
      bookDescription,
      bookAuthor,
      bookIsbn,
      bookPublisher,
      bookPages,
      storeCode,
      createdBy,
    ];

    const result = await connection.query(sql, values);

    loggerService.info('Add new book', result.rows);

    auditService.prepareAudit(
      auditAction.ADD_BOOK,
      result.rows,
      null,
      'thunder client'
    );

    connection.release();
    res.status(201).json({
      message: 'book data saved successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'can not create this book',
      error: error,
    });
  }
};
