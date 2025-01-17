import { WebSocketServer } from 'ws';
import { wssConfig } from './src/configs/socketServerConfig.js';
import { wssManager } from './src/singletons/WebSocketManager.js';
import { retroNotesService } from './src/services/retroNotesService.js';

const wss = new WebSocketServer(wssConfig);

wss.on('connection', function connection(ws) {
  wssManager.addConnection(ws);
  wssManager.pingConnection(ws, 'Connected to web socket');

  ws.on('message', function message(data) {
    try {
      wssManager.receiveDataFromConnection(data, (parsed) => {
        console.log('Received new note: ', parsed);
        retroNotesService.addNewNote(parsed);
      });
    } catch (e) {
      console.log('An error encountered while saving a new note: ', e);
    } finally {
      const payload = JSON.stringify(retroNotesService.getAllNotes());
      console.log('Broadcast payload: ', payload);
      wssManager.broadcast(payload);
    }
  });

  ws.on('close', function () {
    wssManager.removeConnection(ws);
  });
});
