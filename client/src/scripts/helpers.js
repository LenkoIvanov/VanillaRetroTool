import {
  noteAddClass,
  noteDropClass,
  noteImproveClass,
  noteKeepClass,
} from '../constants/domElements';

export const extractClassNameFromNodeType = (topic) => {
  switch (topic) {
    case 'drop':
      return noteDropClass;
    case 'add':
      return noteAddClass;
    case 'keep':
      return noteKeepClass;
    case 'improve':
      return noteImproveClass;
    default:
      return '';
  }
};

export const extractNoteTypeFromClassList = (classList) => {
  if (classList.contains(noteDropClass)) {
    return 'drop';
  } else if (classList.contains(noteAddClass)) {
    return 'add';
  } else if (classList.contains(noteKeepClass)) {
    return 'keep';
  } else if (classList.contains(noteImproveClass)) {
    return 'improve';
  } else {
    return '';
  }
};
