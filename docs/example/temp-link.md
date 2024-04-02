---
deep: true
---

# 链接时效

## 效果展示

生成一个临时链接，这个链接在 10s 后会失效。

![Kapture 2024-04-02 at 21.51.28.gif](https://s2.loli.net/2024/04/02/WNSmHVzUEqGvous.gif)

## 前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html {
        background-color: black;
        color: white;
      }
    </style>
  </head>

  <body>
    <h3>生成临时链接</h3>
    <p>
      <textarea class="input" cols="30" rows="10"></textarea>
      <button>生成</button>
    </p>
    <p>
      <a href="" target="_blank"></a>
    </p>

    <script>
      const input = document.querySelector('.input');
      const button = document.querySelector('button');
      const a = document.querySelector('a');

      button.addEventListener('click', (ev) => {
        ev.preventDefault();
        const url = input.value;
        fetch('http://localhost:3000/link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })
          .then((res) => res.text())
          .then((url) => {
            a.href = url;
            a.textContent = url;
          });
      });
    </script>
  </body>
</html>
```

## 后端代码

```js
const express = require('express');
const { createClient } = require('redis');
const bodyParser = require('body-parser');

function initRedis() {
  const client = createClient();
  client.on('error', (err) => {
    console.log(`Redis Client Error: ${err}`);
  });
  return client;
}

(async function main() {
  const app = express();
  const port = 3000;
  const client = initRedis();
  await client.connect();

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 允许所有域名访问，你也可以指定特定域名
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // 允许的请求方法
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    ); // 允许的请求头
    next();
  });

  app.post('/link', (req, res) => {
    const { url } = req.body;
    const key = Math.random().toString(36).substring(7);
    client.set(key, url, { EX: 10 });
    res.send(`http://localhost:${port}/link/${key}`);
  });

  app.get('/link/:key', async (req, res) => {
    const { key } = req.params;
    const reply = await client.get(key);
    if (reply == null) {
      res.status(404);
      res.send('404 Not Found');
      return;
    }
    res.send(reply);
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})();
```
