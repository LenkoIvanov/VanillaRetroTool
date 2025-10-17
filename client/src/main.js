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
  btnEditClass,
  noteTextAreaId,
  getNoteIdAttribute,
} from './constants/domElements';
import {
  appendCreatedNote,
  createNewNote,
  createWipNote,
  emptyAllNoteSections,
  deleteSingleDomNote,
} from './scripts/domFunctions';
import { extractNoteTypeFromClassList } from './scripts/helpers';
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
  console.log(ev.target);
  if (ev.target.hasAttribute('edit-mode')) {
    const noteId = ev.target.getAttribute('note-id');
    const formData = new FormData(ev.target);
    const newText = formData.get(formNoteContent);
    const noteType = ev.target.getAttribute('note-type-1');
    const editPayload = {
      type: 'edit',
      content: {
        noteId: noteId,
        newText: newText,
      },
    };
    const serializedPayload = JSON.stringify(editPayload);
    socketInstance.send(serializedPayload);

    ev.target.removeAttribute('edit-mode');
    ev.target.removeAttribute('note-id');
    ev.target.removeAttribute('note-type-1');
    const fieldsetElement = ev.target.children.namedItem('note-type'); // TODO --> rework ID name to note-type-selector
    const textArea = ev.target.children.namedItem(noteTextAreaId);
    const submitButton = ev.target.children[ev.target.children.length - 1];
    const checkedInput = document.getElementById(noteType);
    const noteInEditMode = document.querySelectorAll(
      getNoteIdAttribute(noteId),
    );

    // ev.target.clear();

    checkedInput.removeAttribute('checked');
    submitButton.children[1].textContent = 'Add';
    fieldsetElement.removeAttribute('disabled');
    textArea.value = '';
    noteInEditMode.classList.remove('note-in-edit-mode');
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
  const formElement = document.getElementById(newNoteFormId);
  if (formElement.hasAttribute('edit-mode')) {
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
  const formElement = document.getElementById(newNoteFormId);
  if (formElement.hasAttribute('edit-mode')) {
    return;
  }
  if (ev.target.classList.contains(btnEditClass)) {
    const parentNote = ev.target.closest('article');
    parentNote.classList.add('note-in-edit-mode');
    const noteId = parentNote.getAttribute(noteIdAttrName);
    const noteText = parentNote.textContent;
    const noteType = extractNoteTypeFromClassList(parentNote.classList);

    const form = document.getElementById(newNoteFormId);
    const fieldsetElement = form.children.namedItem('note-type');
    const inputElement = document.getElementById(noteType); // Not a direct descendant
    const textArea = form.children.namedItem(noteTextAreaId);
    const submitButton = form.children.item(form.children.length - 1);
    const textContentSubmitButton = submitButton.children[1];

    textArea.value = noteText;
    inputElement.setAttribute('checked', 'true');
    fieldsetElement.setAttribute('disabled', 'true');
    form.setAttribute('note-type-1', noteType);
    form.setAttribute('edit-mode', 'true');
    form.setAttribute('note-id', noteId);
    textContentSubmitButton.textContent = 'Edit';
  }
});

document.addEventListener('onbeforeunload', socketInstance.close);
