import { retroNotePayloadSchema } from '../schemas/retroNoteSchema.js';
import type { RetroNotePayload } from '../types/RetroNoteData.js';

export const parseRetroNote = (data: string): RetroNotePayload | RetroNotePayload[] => {
  try {
    const parsedData = JSON.parse(data);
    if (Array.isArray(parsedData)) {
      return parsedData.map((noteToValidate) => retroNotePayloadSchema.parse(noteToValidate));
    }
    const validatedRetroNote: RetroNotePayload = retroNotePayloadSchema.parse(parsedData);
    return validatedRetroNote;
  } catch (err) {
    throw new Error('An error was encountered while parsing to a retro note');
  }
};
