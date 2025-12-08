import { z } from 'zod';

export const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
});
