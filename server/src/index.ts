/* eslint-disable no-console */
import { WebSocketServer } from 'ws';
import { wssConfig } from './configs/socketServerConfig.js';
import { wssManager } from './singletons/WebSocketManager.js';
import { retroNotesService } from './services/retroNotesService.js';
import type { RetroNoteData } from './types/RetroNoteData.js';
import logger from './singletons/logger.js';

const wss = new WebSocketServer(wssConfig);

logger.info('Server started');

wss.on('connection', function connection(ws) {
  wssManager.addConnection(ws);
  wssManager.pingConnection(ws, 'Connected to web socket');

  ws.on('message', function message(data) {
    try {
      wssManager.receiveDataFromConnection(data.toString(), (parsed: RetroNoteData) => {
        logger.info('Received a new note');
        retroNotesService.addNewNote(parsed);
      });
      const payload = JSON.stringify(retroNotesService.getAllNotes());
      logger.info('Broadcasting payload');
      wssManager.broadcast(payload);
    } catch (e) {
      logger.error('An error ocurred when saving a new note');
    }
  });

  ws.on('close', function () {
    wssManager.removeConnection(ws);
  });
});
