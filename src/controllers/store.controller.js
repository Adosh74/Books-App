import db from './../database/pool.js';
import randomCode from '../utilities/randomString.js';

export const getStoreList = async (_req, res) => {
  try {
    const sql =
      'SELECT store_id, store_name, store_code, store_address, created_on, created_by FROM STORE;';

    const connection = await db.connect();

    const result = await connection.query(sql);
    connection.release();
    return res.status(200).send(JSON.stringify(result.rows));
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'failed get list' });
  }
};

export const addStore = async (req, res) => {
  try {
    const sql = `INSERT INTO STORE
                (store_name, store_code, store_address, created_by)
                values ($1, $2, $3, $4)
                RETURNING store_name, store_code, store_address, created_by;`;

    const connection = await db.connect();

    const storeName = req.body.store_name;
    const storeCode = randomCode();
    const storeAddress = req.body.store_address;
    const createdBy = req.body.created_by;

    if (!storeName || !storeCode || !storeAddress) {
      return res
        .status(500)
        .send(`check storeName, storeCode, storeAddress`);
    }
    const values = [
      storeName,
      storeCode,
      storeAddress,
      createdBy,
    ];
    const result = await connection.query(sql, values);

    return res.status(201).json({
      message: 'store created successfully',
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ error: 'failed create store' });
  }
};
