import {
  formNoteContent,
  formNoteTopic,
  newNoteFormId,
  placeholderNote,
  unpublishedNotesAttr,
} from './constants/domElements';
import { createWipNote } from './scripts/domFunctions';

const notesToSubmit = [];

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
