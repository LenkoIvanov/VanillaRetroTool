import { RetroNote, notesStorageSingleton } from '../singletons/RetroNotes.js';
import { v4 as uuidv4 } from 'uuid';
import type {  RetroNotePayload } from '../types/RetroNoteData.js';

class RetroNotesService {
  addNewNote(request: RetroNotePayload) {
    if (request.creatorId && request.topic && request.text) {
      const noteId = uuidv4();
      const retroNote = new RetroNote(noteId, request.creatorId, request.text, request.topic);
      notesStorageSingleton.addNewNote(retroNote);
    }
  }

  getAllNotes() {
    return {
      notes: notesStorageSingleton.getNotes(),
    };
  }
}

export const retroNotesService = new RetroNotesService();
