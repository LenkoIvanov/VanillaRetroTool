import {
  appendCreatedNote,
  createNewNote,
  deleteNote,
} from './scripts/domFunctions';

window.addEventListener('load', () => {
  const newNote = createNewNote(
    'lenko',
    'note-created-1',
    'improve',
    'test improve',
  );
  appendCreatedNote(newNote, 'improve');
  // setTimeout(() => deleteNote('note-created-1'), 5000);
});
