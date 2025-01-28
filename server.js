// filepath: /C:/Users/DELL/Desktop/blog/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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

// 处理博客文章数据
app.use(express.json());

const postsFilePath = path.join(__dirname, 'posts.json');

app.get('/posts', (req, res) => {
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('读取文件失败');
    }
    res.send(JSON.parse(data));
  });
});

app.post('/posts', (req, res) => {
  const newPost = req.body;
  fs.readFile(postsFilePath, (err, data) => {
    if (err) {
      return res.status(500).send('读取文件失败');
    }
    const posts = JSON.parse(data);
    posts.push(newPost);
    fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('写入文件失败');
      }
      res.send('文章保存成功');
    });
  });
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});