import type { RetroNoteData } from '../types/RetroNoteData.js';

export class RetroNote {
  creatorId: string;
  text: string;
  topic: string;

  constructor(creatorId: string, text: string, topic: string) {
    this.creatorId = creatorId;
    this.text = text;
    this.topic = topic;
  }
}

class RetroNoteStorage {
  noteStorage: RetroNoteData[];

  constructor() {
    this.noteStorage = [];
  }

  getNotes() {
    return this.noteStorage;
  }

  addNewNote(note: RetroNoteData) {
    const storageCopy = this.getNotes();
    storageCopy.push(note);
    this.noteStorage = storageCopy;
  }

  removeNote(noteToRemove: RetroNoteData) {
    const storageCopy = this.getNotes();
    const indexToRemove = storageCopy.findIndex((current) => current.creatorId === noteToRemove.creatorId);
    if (indexToRemove !== -1) {
      storageCopy.splice(indexToRemove, 1);
      this.noteStorage = storageCopy;
    }
  }
}

export const notesStorageSingleton = new RetroNoteStorage();
