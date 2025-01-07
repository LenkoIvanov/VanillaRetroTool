import { Connection, connectionStorageSingleton } from "../singletons/Connections.js"


class ConnectionService{
    constructor() {}

    addNewConnection(userId){
        const newConnection = new Connection(userId);
        connectionStorageSingleton.addNewConnection(newConnection);
    }

    removeNewConnection(userId){
        connectionStorageSingleton.removeConnection(userId);
    }
}

export const connectionService = new ConnectionService();