export class RetroNote {
  constructor(creatorId, text, topic) {
    this.creatorId = creatorId;
    this.text = text;
    this.topic = topic;
  }
}

class RetroNoteStorage {
  constructor() {
    this.noteStorage = [];
  }

  getNotes() {
    return this.noteStorage;
  }

  addNewNote(note) {
    if (note instanceof RetroNote) {
      const storageCopy = this.getNotes();
      storageCopy.push(note);
      this.noteStorage = storageCopy;
    }
  }

  removeNote(noteToRemove) {
    if (noteToRemove instanceof RetroNote) {
      const storageCopy = this.getNotes();
      const indexToRemove = storageCopy.findIndex((current) => current.userId === noteToRemove.userId);
      if (indexToRemove !== -1) {
        storageCopy.splice(indexToRemove, 1);
        this.noteStorage = storageCopy;
      }
    }
  }
}

export const notesStorageSingleton = new RetroNoteStorage();
