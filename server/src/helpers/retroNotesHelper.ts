import type { RetroNoteData } from '../types/RetroNoteData.js';

export const parseRetroNote = (data: string): RetroNoteData => {
  try {
    const parsedData: RetroNoteData = JSON.parse(data);
    return parsedData;
  } catch (err) {
    throw new Error('An error was encountered while parsing to a retro note');
  }
};
