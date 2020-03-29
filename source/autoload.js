import 'svgxuse';
import 'custom-event-polyfill';
import ObjectFitImages from 'object-fit-images';

require('./autoload.scss');

ObjectFitImages(null, { watchMQ: true });
window.bodyLock = require('body-scroll-lock');

require('./blocks/slider/slider');
require('./blocks/menu/menu');
