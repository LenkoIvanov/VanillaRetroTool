import logger from '../singletons/logger.js';
import type { RetroNotePayload } from '../types/RetroNoteData.js';
import { retroNotesService } from './retroNotesService.js';

class WebSocketService {
  handleNoteCreation(parsedData: RetroNotePayload[]) {
    logger.info('Received a new note');
    parsedData.forEach((payload) => retroNotesService.addNewNote(payload));
  }

  handleNoteDeletion(idToDelete: string) {
    logger.info('Received a note to delete');
    retroNotesService.deleteNote(idToDelete);
  }

  handleNoteEdit(idToEdit: string, newText: string) {
    logger.info('Received a note to edit');
    retroNotesService.editNote(idToEdit, newText);
  }
}

export const webSocketService = new WebSocketService();
