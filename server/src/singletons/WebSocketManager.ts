import { WebSocket } from 'ws';
import type { RetroNotePayload } from '../types/RetroNoteData.js';
import logger from './logger.js';
import { parseIncomingData } from '../helpers/helper.js';

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

  receiveDataFromConnection(
    data: string,
    createCallback: (parsedData: RetroNotePayload[]) => void,
    deleteCallback: (idToDelete: string) => void,
    loginCallback: (username: string) => void
  ) {
    const parsedData = parseIncomingData(data);
    switch (parsedData.type) {
      case 'create':
        createCallback(parsedData.content.notes);
        break;
      case 'delete':
        deleteCallback(parsedData.content.noteId);
        break;
      case 'login':
        loginCallback(parsedData.content.username);
        break;
      default:
        break;
    }
    return parsedData;
  }
}

export const wssManager = new WebSocketManager();
