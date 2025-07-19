import { WebSocket } from 'ws';
import type { RetroNotePayload } from '../types/RetroNoteData.js';
import { parseRetroNote } from '../helpers/retroNotesHelper.js';
import logger from './logger.js';

class WebSocketManager {
  connections: Set<WebSocket>;

  constructor() {
    this.connections = new Set<WebSocket>();
  }

  get getConnections() {
    return this.connections;
  }

  addConnection(newConnection: WebSocket) {
    if (newConnection instanceof WebSocket) {
      this.connections.add(newConnection);
      logger.info('Connection added');
    }
  }

  removeConnection(connection: WebSocket) {
    if (connection instanceof WebSocket) {
      this.connections.delete(connection);
      logger.info('Connection removed');
    }
  }

  pingConnection(connection: WebSocket, message: string) {
    if (connection instanceof WebSocket) {
      const stringifiedMessage = JSON.stringify({
        pingMsg: message,
      });
      connection.send(stringifiedMessage);
    }
  }

  broadcast(payload: string) {
    for (const connection of this.connections) {
      if (connection.readyState === WebSocket.OPEN) {
        connection.send(payload);
      }
    }
  }

  receiveDataFromConnection(data: string, callback: (parsedData: RetroNotePayload) => void) {
    const newRetroNote = parseRetroNote(data);
    callback(newRetroNote);
  }
}

export const wssManager = new WebSocketManager();
