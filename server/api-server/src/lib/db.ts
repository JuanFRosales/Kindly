import mysql from 'mysql2/promise';

const promisePool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Convert JSON fields to objects
  typeCast: function (field, next) {
    if (field.type === 'JSON') {
      const fieldString = field.string();
      if (fieldString === null) {
        throw new Error('Field string is null');
      }
      return JSON.parse(fieldString);
    }
    return next();
  },
});

export default promisePool;
