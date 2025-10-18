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
  noteInEditModeClass,
  newNoteFormId,
  noteTextAreaId,
  formNoteFieldset,
  editModeAttrName,
  editFormNoteIdAttrName,
  editFormNoteTypeAttrName,
  noteTextClass,
} from '../constants/domElements';
import { getNoteTypeClass, extractNoteTypeFromClassList } from './helpers';

export const createWipNote = (text, topic) => {
  const newNote = document.createElement('article');
  newNote.classList.add(noteClass);

  const noteTypeClass = getNoteTypeClass(topic);
  newNote.classList.add(noteTypeClass);

  const noteContent = document.createElement('p');
  noteContent.classList.add(noteTextClass);
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
  noteContent.classList.add(noteTextClass);
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

export const toggleEditModeOn = (ev) => {
  const parentNote = ev.target.closest('article');
  const noteId = parentNote.getAttribute(noteIdAttrName);
  const noteText = parentNote.textContent;
  const noteType = extractNoteTypeFromClassList(parentNote.classList);

  const form = document.getElementById(newNoteFormId);
  const fieldsetElement = form.children.namedItem(formNoteFieldset);
  // Not a direct descendant of the fieldset
  const inputElement = document.getElementById(noteType);
  const textArea = form.children.namedItem(noteTextAreaId);
  const submitButton = form.children.item(form.children.length - 1);
  const textContentSubmitButton = submitButton.children[1];

  form.setAttribute(editModeAttrName, 'true');
  form.setAttribute(editFormNoteIdAttrName, noteId);
  form.setAttribute(editFormNoteTypeAttrName, noteType);

  parentNote.classList.add(noteInEditModeClass);
  textArea.value = noteText;
  textContentSubmitButton.textContent = 'Edit';
  inputElement.setAttribute('checked', 'true');
  fieldsetElement.setAttribute('disabled', 'true');
};

export const toggleEditModeOff = (ev, noteId, noteType) => {
  ev.target.removeAttribute(editModeAttrName);
  ev.target.removeAttribute(editFormNoteIdAttrName);
  ev.target.removeAttribute(editFormNoteTypeAttrName);
  const fieldsetElement = ev.target.children.namedItem(formNoteFieldset);
  const textArea = ev.target.children.namedItem(noteTextAreaId);
  const submitButton = ev.target.children[ev.target.children.length - 1];
  const checkedInput = document.getElementById(noteType);
  const noteInEditMode = document.querySelectorAll(getNoteIdAttribute(noteId));

  submitButton.children[1].textContent = 'Add';
  textArea.value = '';
  checkedInput.removeAttribute('checked');
  fieldsetElement.removeAttribute('disabled');
  noteInEditMode.classList.remove(noteInEditModeClass);
};
