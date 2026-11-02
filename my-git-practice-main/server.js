const express = require('express');
const db = require('./db'); // Gọi file kết nối cơ sở dữ liệu db.js vào đây

const app = express();
const PORT = 3000;

// Viết một API đơn giản thử nghiệm lấy danh sách sinh viên
app.get('/sinh-vien', (req, res) => {
  db.query('SELECT * FROM sinh_vien', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Trả về danh sách sinh viên dưới dạng JSON
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng http://localhost:${PORT}`);
});