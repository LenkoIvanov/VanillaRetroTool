import {
  formNoteContent,
  formNoteTopic,
  newNoteFormId,
  placeholderNote,
  publishNotesBtnAttr,
  unpublishedNotesAttr,
  notePlaceholderClass,
  noteIdAttrName,
  btnDeleteClass,
} from './constants/domElements';
import {
  appendCreatedNote,
  createNewNote,
  createWipNote,
  emptyAllNoteSections,
  deleteSingleDomNote,
} from './scripts/domFunctions';
import { openSocket } from './scripts/socketConnection';

const notesToSubmit = [];

const onBroadcastReceive = (ev) => {
  console.log('Broadcast received:', ev);
  const parsedData = JSON.parse(ev.data);
  console.log(parsedData);
  if (typeof parsedData.notes !== 'undefined') {
    emptyAllNoteSections();
    parsedData.notes.forEach((note) => {
      const domNote = createNewNote(
        note.creatorId,
        note.noteId,
        note.topic,
        note.text,
      );
      appendCreatedNote(domNote, note.topic);
    });
  } else if (parsedData.participants) {
    const newParticipant =
      parsedData.participants[parsedData.participants.length - 1];
    localStorage.setItem('user', JSON.stringify(newParticipant));
  }
};

const expungeOldUnpublishedNotes = () => {
  const unpublishedSection = document.querySelector(unpublishedNotesAttr);
  const childNotes = Array.from(
    unpublishedSection.getElementsByTagName('article'),
  );

  for (const child of childNotes) {
    if (!child.classList.contains(notePlaceholderClass)) {
      unpublishedSection.removeChild(child);
    }
  }

  notesToSubmit.length = 0;
};

const socketInstance = openSocket(onBroadcastReceive);

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

const publishBtn = document.querySelector(publishNotesBtnAttr);
publishBtn.addEventListener('click', () => {
  const payload = {
    type: 'create',
    content: {
      notes: notesToSubmit,
    },
  };
  const serializedPayload = JSON.stringify(payload);
  socketInstance.send(serializedPayload);
  expungeOldUnpublishedNotes();
});

document.addEventListener('click', (ev) => {
  if (ev.target.classList.contains(btnDeleteClass)) {
    const parentNote = ev.target.closest('article');
    const noteId = parentNote.getAttribute(noteIdAttrName);
    const payload = {
      type: 'delete',
      content: {
        noteId: noteId,
      },
    };
    const serializedPayload = JSON.stringify(payload);
    socketInstance.send(serializedPayload);
    deleteSingleDomNote(noteId);
  }
});

document.addEventListener('onbeforeunload', socketInstance.close);
