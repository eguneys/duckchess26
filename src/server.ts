import express from 'express';
import { WebSocketServer } from 'ws';

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

// WebSocket setup
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
