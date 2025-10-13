import {
  actionsContainerClass,
  addSectionAttr,
  btnClass,
  btnDeleteClass,
  btnEditClass,
  btnRoundClass,
  creatorIdAttrName,
  dropSectionAttr,
  faPen,
  faRegular,
  faTrash,
  getNoteIdAttribute,
  improveSectionAttr,
  keepSectionAttr,
  noteClass,
  noteIdAttrName,
} from '../constants/domElements';
import { getNoteTypeClass } from './helpers';

export const createWipNote = (text, topic) => {
  const newNote = document.createElement('article');
  newNote.classList.add(noteClass);

  const noteTypeClass = getNoteTypeClass(topic);
  newNote.classList.add(noteTypeClass);

  const noteContent = document.createElement('p');
  noteContent.textContent = text;
  newNote.appendChild(noteContent);

  return newNote;
};

export const createNewNote = (creatorId, noteId, topic, text) => {
  const newNote = document.createElement('article');
  newNote.classList.add(noteClass);

  const noteTypeClass = getNoteTypeClass(topic);
  newNote.classList.add(noteTypeClass);

  const noteContent = document.createElement('p');
  noteContent.textContent = text;
  newNote.appendChild(noteContent);
  newNote.setAttribute(creatorIdAttrName, creatorId);
  newNote.setAttribute(noteIdAttrName, noteId);

  // TODO --> Refactor once we have the actual creator ID
  if (creatorId === 'Lenko') {
    const actionsContainer = createNoteActionsContainer();
    newNote.appendChild(actionsContainer);
  }

  return newNote;
};

export const appendCreatedNote = (newNote, topic) => {
  const dropSection = document.querySelector(dropSectionAttr);
  const addSection = document.querySelector(addSectionAttr);
  const keepSection = document.querySelector(keepSectionAttr);
  const improveSection = document.querySelector(improveSectionAttr);

  switch (topic) {
    case 'drop':
      dropSection.appendChild(newNote);
      break;
    case 'add':
      addSection.appendChild(newNote);
      break;
    case 'keep':
      keepSection.appendChild(newNote);
      break;
    case 'improve':
      improveSection.appendChild(newNote);
      break;
    default:
      break;
  }
};

export const emptyAllNoteSections = () => {
  const dropSection = document.querySelector(dropSectionAttr);
  const addSection = document.querySelector(addSectionAttr);
  const keepSection = document.querySelector(keepSectionAttr);
  const improveSection = document.querySelector(improveSectionAttr);

  dropSection.innerHTML = '';
  addSection.innerHTML = '';
  keepSection.innerHTML = '';
  improveSection.innerHTML = '';
};

export const deleteSingleDomNote = (noteId) => {
  const noteToDelete = document.querySelector(getNoteIdAttribute(noteId));
  noteToDelete.remove();
};

const createNoteActionsContainer = () => {
  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add(actionsContainerClass);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add(btnClass, btnRoundClass, btnDeleteClass);
  const deleteContent = document.createElement('i');
  deleteContent.classList.add(faRegular, faTrash);
  deleteButton.appendChild(deleteContent);
  actionsContainer.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.classList.add(btnClass, btnRoundClass, btnEditClass);
  const editContent = document.createElement('i');
  editContent.classList.add(faRegular, faPen);
  editButton.appendChild(editContent);
  actionsContainer.appendChild(editButton);

  return actionsContainer;
};
