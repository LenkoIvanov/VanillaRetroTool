/* eslint-disable no-console */
import { WebSocket } from 'ws';

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
    }
  }

  removeConnection(connection: WebSocket) {
    if (connection instanceof WebSocket) {
      this.connections.delete(connection);
      console.log('Connection removed');
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

  receiveDataFromConnection(data: string, callback: (parsedData: any) => void) {
    const parsedData = JSON.parse(data);
    callback(parsedData);
  }
}

export const wssManager = new WebSocketManager();
