import { z } from 'zod';

export const retroNotePayloadSchema = z.object({
  creatorId: z.string(),
  text: z.string(),
  topic: z.string(),
});
