import { WebSocket } from "ws";

class WebSocketManager {
    constructor() {
        this.connections = new Set();
    }

    get getConnections() {
        return this.connections;
    }

    addConnection(newConnection){
        if(newConnection instanceof WebSocket){
            this.connections.add(newConnection);
        }
    }

    removeConnection(connection) {
        if(connection instanceof WebSocket){
            this.connections.delete(connection);
            console.log('Connection removed');
        }
    }

    pingConnection(connection, message) {
        if(connection instanceof WebSocket){
            const stringifiedMessage = JSON.stringify({
                pingMsg: message
            });
            connection.send(stringifiedMessage);
        }
    }

    broadcast(payload){
        for(const connection of this.connections){
            if(connection instanceof WebSocket && connection.readyState === WebSocket.OPEN){
                connection.send(payload);
            }
        }
    }

    receiveDataFromConnection(data, callback) {
        const parsedData = JSON.parse(data);
        callback(parsedData);
    }
}

export const wssManager = new WebSocketManager();