import type { RetroNoteData } from '../types/RetroNoteData.js';

export class RetroNote {
  noteId: string;
  creatorId: string;
  text: string;
  topic: string;

  constructor(noteId: string, creatorId: string, text: string, topic: string) {
    this.noteId = noteId;
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

  removeNote(noteId: string) {
    const storageCopy = this.getNotes();
    const indexToRemove = storageCopy.findIndex((current) => current.noteId === noteId);
    if (indexToRemove !== -1) {
      storageCopy.splice(indexToRemove, 1);
      this.noteStorage = storageCopy;
    }
  }

  editNote(noteId: string, newText: string) {
    const storageCopy = this.getNotes();
    const indexToEdit = storageCopy.findIndex((current) => current.noteId === noteId);
    if (indexToEdit !== -1) {
      const noteToEdit = storageCopy[indexToEdit];
      if (noteToEdit) {
        noteToEdit.text = newText;
      }
      this.noteStorage = storageCopy;
    }
  }
}

export const notesStorageSingleton = new RetroNoteStorage();
