/* eslint-disable no-console */
import { WebSocketServer } from 'ws';
import { wssConfig } from './configs/socketServerConfig.js';
import { wssManager } from './singletons/WebSocketManager.js';
import { retroNotesService } from './services/retroNotesService.js';

// TODO --> Create a logger to avoid console logging stuff
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
