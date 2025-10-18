import { z } from 'zod';
import { retroNotePayloadSchema } from './retroNoteSchema.js';

const createPayloadSchema = z.object({
  type: z.literal('create'),
  content: z.object({
    notes: z.array(retroNotePayloadSchema),
  }),
});

const deletePayloadSchema = z.object({
  type: z.literal('delete'),
  content: z.object({
    noteId: z.string(),
  }),
});

const editPayloadSchema = z.object({
  type: z.literal('edit'),
  content: z.object({
    noteId: z.string(),
    newText: z.string(),
  }),
});

export const incomingDataSchema = z.discriminatedUnion('type', [
  createPayloadSchema,
  deletePayloadSchema,
  editPayloadSchema,
]);
