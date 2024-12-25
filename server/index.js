import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.send('Connection established');
  
    ws.on('message', function message(data) {
        const parsedData = JSON.parse(data);
        console.log('Message recieved: ', parsedData.message);
  });
});