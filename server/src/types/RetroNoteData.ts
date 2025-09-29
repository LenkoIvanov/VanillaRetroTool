export type RetroNoteData = {
  noteId: string;
  creatorId: string;
  text: string;
  topic: string;
};

export type RetroNotePayload = Omit<RetroNoteData, 'noteId'>;