import { RetroNote, notesStorageSingleton } from '../singletons/RetroNotes.js';
import type { RetroNoteData } from '../types/RetroNoteData.js';

class RetroNotesService {
  addNewNote(request: RetroNoteData) {
    if (request.creatorId && request.topic && request.text) {
      const retroNote = new RetroNote(request.creatorId, request.text, request.topic);
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
