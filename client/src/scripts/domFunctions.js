export const createNewNote = (creatorId, noteId, topic, text) => {
  const newNote = document.createElement('article');
  newNote.classList.add('note');

  switch (topic) {
    case 'drop':
      newNote.classList.add('note-danger');
      break;
    case 'add':
      newNote.classList.add('note-success');
      break;
    case 'keep':
      newNote.classList.add('note-info');
      break;
    case 'improve':
      newNote.classList.add('note-warning');
      break;
    default:
      break;
  }

  const noteContent = document.createElement('p');
  noteContent.textContent = text;
  newNote.appendChild(noteContent);
  newNote.setAttribute('data-noteCreator', creatorId);
  newNote.setAttribute('data-noteId', noteId);

  const actionsContainer = document.createElement('div');
  actionsContainer.classList.add('note-actions');
  newNote.append(actionsContainer);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-round', 'delete');
  const deleteContent = document.createElement('i');
  deleteContent.classList.add('fa-regular', 'fa-trash-can');
  deleteButton.appendChild(deleteContent);
  actionsContainer.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-round', 'edit');
  const editContent = document.createElement('i');
  editContent.classList.add('fa-regular', 'fa-pen-to-square');
  editButton.appendChild(editContent);
  actionsContainer.appendChild(editButton);

  return newNote;
};

export const appendCreatedNote = (newNote, topic) => {
  const dropSection = document.querySelector(
    "[data-noteColumn='drop-section']",
  );
  const addSection = document.querySelector("[data-noteColumn='add-section']");
  const keepSection = document.querySelector(
    "[data-noteColumn='keep-section']",
  );
  const improveSection = document.querySelector(
    "[data-noteColumn='improve-section']",
  );

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
  const noteToDelete = document.querySelector(`[data-noteId='${noteId}']`);
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
