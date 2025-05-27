import { dom, library } from '@fortawesome/fontawesome-svg-core';
import * as farIcons from '@fortawesome/free-regular-svg-icons';

const regularIcons = Object.keys(farIcons)
  .filter((key) => key.startsWith('fa'))
  .map((icon) => farIcons[icon]);

library.add(...regularIcons);

dom.watch();