import { WebSocketServer } from 'ws';
import { wssConfig } from './src/configs/socketServerConfig.js';
import { wssManager } from './src/singletons/WebSocketManager.js'

const wss = new WebSocketServer(wssConfig);

wss.on('connection', function connection(ws) {
    wssManager.addConnection(ws);
    wssManager.pingConnection(ws, 'Connected to web socket');
  
    ws.on('message', function message(data) {
        wssManager.receiveDataFromConnection(data, (parsed) => {
          console.log("Do something with connection data: ", parsed)
        })
    });

    ws.on('close', function () {
      wssManager.removeConnection(ws)
    });
});