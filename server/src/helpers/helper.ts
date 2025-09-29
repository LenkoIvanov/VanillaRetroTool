import { incomingDataSchema } from '../schemas/incomingDataSchema.js';

export const parseIncomingData = (data: string) => {
  try {
    const parsedData = JSON.parse(data);
    console.log('parsed incoming data: ', parsedData);
    const validatedRetroNote = incomingDataSchema.parse(parsedData);
    return validatedRetroNote;
  } catch (err) {
    throw new Error('An error was encountered while parsing to a retro note');
  }
};
