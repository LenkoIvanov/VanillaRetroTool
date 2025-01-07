export class Connection {
    constructor(userId) {
        this.userId = userId;
    }
}

class NonPersistentConnectionStorage {
    constructor() {
        this.connectionStorage = [];
    }

    get getConnections() {
        return this.connectionStorage;
    }

    getSingleConnectionIdx(userId) {
        return this.getConnections.findIndex((current) => current.userId === userId);
    }

    addNewConnection(connection){
        if(connection instanceof Connection){
            const storageCopy = this.getConnections;
            storageCopy.push(connection);
            this.connectionStorage = storageCopy;
        }
    }

    removeConnection(userId){
        const storageCopy = this.getConnections;
        const indexToRemove = this.getSingleConnectionIdx(userId);
        if(indexToRemove !== -1) {
            storageCopy.splice(indexToRemove, 1);
            this.connectionStorage = storageCopy;
        }
    }
}

export const connectionStorageSingleton = new NonPersistentConnectionStorage();