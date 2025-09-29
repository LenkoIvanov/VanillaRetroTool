import {
  noteAddClass,
  noteDropClass,
  noteImproveClass,
  noteKeepClass,
} from '../constants/domElements';

export const getNoteTypeClass = (topic) => {
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
