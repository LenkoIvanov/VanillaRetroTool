import { WebSocketServer } from 'ws';
import { wssConfig } from './src/configs/socketServerConfig.js';
import { connectionService } from './src/services/connectionService.js';
import { connectionStorageSingleton } from './src/singletons/Connections.js'

const wss = new WebSocketServer(wssConfig);

wss.on('connection', function connection(ws, request) {
    ws.send('Connection established');
    connectionService.addNewConnection('blaaa')
  
    ws.on('message', function message(data) {
        const parsedData = JSON.parse(data);
        console.log('Test connection: ', JSON.stringify(connectionStorageSingleton.getConnections))
        console.log('Message recieved: ', parsedData.message);
    });

    ws.on('close', function () {
      connectionService.removeNewConnection('blaaa');
      console.log('Test connection: ', JSON.stringify(connectionStorageSingleton.getConnections))
    });
});