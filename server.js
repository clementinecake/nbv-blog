// filepath: /C:/Users/DELL/Desktop/blog/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// 设置文件存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// 处理文件上传
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('文件上传成功');
});

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});