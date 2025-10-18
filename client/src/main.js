import {
  formNoteContent,
  formNoteTopic,
  newNoteFormId,
  placeholderNoteId,
  publishNotesBtnAttr,
  unpublishedNotesAttr,
  notePlaceholderClass,
  noteIdAttrName,
  btnDeleteClass,
  editModeAttrName,
  editFormNoteTypeAttrName,
  editFormNoteIdAttrName,
} from './constants/domElements';
import {
  appendCreatedNote,
  createNewNote,
  createWipNote,
  emptyAllNoteSections,
  deleteSingleDomNote,
  toggleEditModeOn,
  toggleEditModeOff,
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
  if (ev.target.hasAttribute(editModeAttrName)) {
    const noteId = ev.target.getAttribute(editFormNoteIdAttrName);
    const noteType = ev.target.getAttribute(editFormNoteTypeAttrName);

    const formData = new FormData(ev.target);
    const newText = formData.get(formNoteContent);

    const editPayload = {
      type: 'edit',
      content: {
        noteId: noteId,
        newText: newText,
      },
    };
    const serializedPayload = JSON.stringify(editPayload);
    socketInstance.send(serializedPayload);

    toggleEditModeOff(ev, noteId, noteType);
  } else {
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
  }
});

const placeholderBtn = document.getElementById(placeholderNoteId);
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
  const formElement = document.getElementById(newNoteFormId);
  if (formElement.hasAttribute(editModeAttrName)) {
    return;
  }

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

document.addEventListener('click', (ev) => {
  if (newNoteForm.hasAttribute(editModeAttrName)) {
    return;
  }
  toggleEditModeOn(ev);
});

document.addEventListener('onbeforeunload', socketInstance.close);
