import { z } from 'zod';

export const retroNoteSchema = z.object({
  creatorId: z.string(),
  text: z.string(),
  topic: z.string(),
});
