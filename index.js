import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './src/routes/index.js';
import db from './src/database/pool.js';

//* test database*/
db.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    });
});

const app = express();

//****  Middleware  ****/
// cors middleware
app.use(cors());
// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///* APIs endpoint *////
app.use(router);

app.get('/', (_req, res) => {
  res.send('server running');
});

app.listen('5000', () => {
  console.log(`app listening on http://localhost:5000`);
});
