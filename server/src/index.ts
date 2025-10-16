/* eslint-disable no-console */
import { WebSocketServer } from 'ws';
import { wssConfig } from './configs/socketServerConfig.js';
import { wssManager } from './singletons/WebSocketManager.js';
import { retroNotesService } from './services/retroNotesService.js';
import logger from './singletons/logger.js';
import { webSocketService } from './services/webSocketService.js';
import { loginService } from './services/loginService.js';
import { parseIncomingData } from './helpers/helper.js';

const wss = new WebSocketServer(wssConfig);

logger.info('Server started');

wss.on('connection', function connection(ws) {
  wssManager.addConnection(ws);
  wssManager.pingConnection(ws, 'Connected to web socket');

  // Broadcast all notes on established connection
  const notes = retroNotesService.getAllNotes();
  if (notes.notes.length > 0) {
    const payload = JSON.stringify(notes);
    wssManager.broadcast(payload);
  }

  ws.on('message', function message(data) {
    try {
      const parsedData = wssManager.receiveDataFromConnection(
        data.toString(),
        webSocketService.handleNoteCreation,
        webSocketService.handleNoteDeletion,
        loginService.loginParticipant
      );
      console.log(parsedData);

      if (parsedData.type === 'login') {
        const participants = JSON.stringify(loginService.getAllParticipants());
        wssManager.broadcast(participants);
      } else {
        const payload = JSON.stringify(retroNotesService.getAllNotes());
        logger.info('Broadcasting payload');
        wssManager.broadcast(payload);
      }
    } catch (e) {
      logger.error('An error ocurred when saving a new note');
    }
  });

  ws.on('close', function () {
    wssManager.removeConnection(ws);
  });
});
