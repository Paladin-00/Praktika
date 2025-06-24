const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


app.use(express.static('app'));

// Вебсокет для чату
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log('Received:', message);
    // Відповідь бота
    ws.send(`Ми раді що ви звернулись саме до нас якщо ми недамо вам відповідь в найближчі кілька хвилин просим надіслати ваше повідомлення нам на пошту`);
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/test.html`));
