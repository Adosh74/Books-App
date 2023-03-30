import db from './../database/pool.js';

export const getBooks = async (_req, res) => {
  try {
    const sql = `SELECT book_title, book_description,
                book_author, book_isbn, book_publisher,
                book_pages, store_code
                FROM books;`;

    const connection = await db.connect();

    const result = await connection.query(sql);

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

export const createBook = async (req, res) => {
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
    RETURNING`;
};
