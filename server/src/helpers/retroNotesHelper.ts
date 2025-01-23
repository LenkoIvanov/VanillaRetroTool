import { retroNoteSchema } from '../schemas/retroNoteSchema.js';
import type { RetroNoteData } from '../types/RetroNoteData.js';

export const parseRetroNote = (data: string): RetroNoteData => {
  try {
    const parsedData = JSON.parse(data);
    const validatedRetroNote: RetroNoteData = retroNoteSchema.parse(parsedData);
    return validatedRetroNote;
  } catch (err) {
    throw new Error('An error was encountered while parsing to a retro note');
  }
};
