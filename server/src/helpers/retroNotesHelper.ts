import { retroNotePayloadSchema } from '../schemas/retroNoteSchema.js';
import type { RetroNotePayload } from '../types/RetroNoteData.js';

export const parseRetroNote = (data: string): RetroNotePayload => {
  try {
    const parsedData = JSON.parse(data);
    const validatedRetroNote: RetroNotePayload = retroNotePayloadSchema.parse(parsedData);
    return validatedRetroNote;
  } catch (err) {
    throw new Error('An error was encountered while parsing to a retro note');
  }
};
