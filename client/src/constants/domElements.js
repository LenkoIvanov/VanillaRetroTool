// classes
export const noteClass = 'note';
export const noteDropClass = 'note-danger';
export const noteAddClass = 'note-success';
export const noteKeepClass = 'note-info';
export const noteImproveClass = 'note-warning';

export const actionsContainerClass = 'note-actions';
export const btnClass = 'btn';
export const btnRoundClass = 'btn-round';
export const btnDeleteClass = 'delete';
export const btnEditClass = 'edit';

export const faRegular = 'fa-regular';
export const faPen = 'fa-pen-to-square';
export const faTrash = 'fa-trash-can';

// attributes
export const creatorIdAttrName = 'data-noteCreator';
export const noteIdAttrName = 'data-noteId';

export const dropSectionAttr = "[data-noteColumn='drop-section']";
export const addSectionAttr = "[data-noteColumn='add-section']";
export const keepSectionAttr = "[data-noteColumn='keep-section']";
export const improveSectionAttr = "[data-noteColumn='improve-section']";
export const unpublishedNotesAttr = "[data-section='unpublished-notes']";
export const publishNotesBtnAttr = "[data-button='publish-notes']";

export const getNoteIdAttribute = (noteId) => `[data-noteId='${noteId}']`;
export const getNoteCreatorIdAttribute = (creatorId) =>
  `[data-noteCreator='${creatorId}']`;

// ids
export const newNoteFormId = 'create-note-form';
export const placeholderNote = 'placeholder-note';

// form fields
export const formNoteTopic = 'topic';
export const formNoteContent = 'note-content';
