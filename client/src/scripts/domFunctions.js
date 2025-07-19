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
  noteAddClass,
  noteClass,
  noteDropClass,
  noteIdAttrName,
  noteImproveClass,
  noteKeepClass,
} from '../constants/domElements';

export const createWipNote = (text, topic) => {
  const newNote = document.createElement('article');
  newNote.classList.add(noteClass);

  switch (topic) {
    case 'drop':
      newNote.classList.add(noteDropClass);
      break;
    case 'add':
      newNote.classList.add(noteAddClass);
      break;
    case 'keep':
      newNote.classList.add(noteKeepClass);
      break;
    case 'improve':
      newNote.classList.add(noteImproveClass);
      break;
    default:
      break;
  }

  const noteContent = document.createElement('p');
  noteContent.textContent = text;
  newNote.appendChild(noteContent);

  return newNote;
};

export const createNewNote = (creatorId, noteId, topic, text) => {
  const newNote = document.createElement('article');
  newNote.classList.add(noteClass);

  switch (topic) {
    case 'drop':
      newNote.classList.add(noteDropClass);
      break;
    case 'add':
      newNote.classList.add(noteAddClass);
      break;
    case 'keep':
      newNote.classList.add(noteKeepClass);
      break;
    case 'improve':
      newNote.classList.add(noteImproveClass);
      break;
    default:
      break;
  }

  const noteContent = document.createElement('p');
  noteContent.textContent = text;
  newNote.appendChild(noteContent);
  newNote.setAttribute(creatorIdAttrName, creatorId);
  newNote.setAttribute(noteIdAttrName, noteId);

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add(actionsContainerClass);
  newNote.append(actionsContainer);

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

export const deleteNote = (noteId) => {
  const noteToDelete = document.querySelector(getNoteIdAttribute(noteId));
  noteToDelete.remove();
};

{
  /* <article class="note note-success">
<p>My second note</p>
<div class="note-actions">
  <button class="btn btn-round delete">
    <i class="fa-regular fa-trash-can"></i>
  </button>
  <button class="btn btn-round edit">
    <i class="fa-regular fa-pen-to-square"></i>
  </button>
</div>
</article> */
}
