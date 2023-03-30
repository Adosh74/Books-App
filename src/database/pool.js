import pkg from 'pg'
const { Pool } = pkg
import config from '../../config.js'

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  port: parseInt(config.dbPort, 10),
  max: 5,
})

pool.on('error', (error) => {
  console.log(error)
})

export default pool
