require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối MySQL thất bại: ' + err.stack);
    return;
  }
  console.log('Đã kết nối thành công với MySQL ID: ' + connection.threadId);
});

module.exports = connection;