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
  btnEditClass,
  userListBtnAttr,
  participantsModalAttr,
  userModalOpen,
} from './constants/domElements';
import {
  createWipNote,
  deleteSingleDomNote,
  toggleEditModeOn,
  toggleEditModeOff,
  createUserListItem,
} from './scripts/domFunctions';
import { socketInstance } from './scripts/socketConnection';

const notesToSubmit = [];

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

addEventListener('load', () => {
  const userList = JSON.parse(localStorage.getItem('userList'));
  const currentUserName = JSON.parse(localStorage.getItem('user')).name;
  if (userList && userList.length) {
    userList.forEach((username) => {
      if (currentUserName === username) {
        createUserListItem(username + ' (You)');
      } else {
        createUserListItem(username);
      }
    });
  }
});

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
      creatorId: localStorage.getItem('user'),
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

  if (ev.target.classList.contains(btnEditClass)) {
    toggleEditModeOn(ev);
  }
});

const participantsBtn = document.querySelector(userListBtnAttr);
participantsBtn.addEventListener('click', () => {
  const participantsModal = document.querySelector(participantsModalAttr);

  if (participantsModal.classList.contains(userModalOpen)) {
    participantsModal.classList.remove(userModalOpen);
    return;
  }

  participantsModal.classList.add(userModalOpen);
});

document.addEventListener('onbeforeunload', socketInstance.close);
