import {
  formNoteContent,
  formNoteTopic,
  newNoteFormId,
  placeholderNote,
  unpublishedNotesAttr,
} from './constants/domElements';
import {
  appendCreatedNote,
  createNewNote,
  createWipNote,
  emptyAllNoteSections,
} from './scripts/domFunctions';
import { openSocket } from './scripts/socketConnection';

const notesToSubmit = [];

const onBroadcastReceive = (ev) => {
  console.log('Broadcast received:', ev);
  const parsedNoteData = JSON.parse(ev.data);
  console.log(parsedNoteData);
  if (typeof parsedNoteData.notes !== 'undefined') {
    emptyAllNoteSections();
    parsedNoteData.notes.forEach((note) => {
      const domNote = createNewNote(
        note.creatorId,
        note.noteId,
        note.topic,
        note.text,
      );
      appendCreatedNote(domNote, note.topic);
    });
  }
};

openSocket(onBroadcastReceive);

const newNoteForm = document.getElementById(newNoteFormId);
newNoteForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const notePayload = {
    creatorId: 'Lenko',
    topic: formData.get(formNoteTopic),
    text: formData.get(formNoteContent),
  };

  notesToSubmit.push(notePayload);
  const newNote = createWipNote(notePayload.text, notePayload.topic);

  const unpublishedSection = document.querySelector(unpublishedNotesAttr);
  unpublishedSection.appendChild(newNote);

  ev.target.reset();
});

const placeholderBtn = document.getElementById(placeholderNote);
placeholderBtn.addEventListener('click', () => {
  // TODO --> Refactor to improve readability
  newNoteForm.elements[5].focus();
});
