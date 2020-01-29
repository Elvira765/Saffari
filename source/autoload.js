import 'svgxuse';
import 'custom-event-polyfill';
import ObjectFitImages from 'object-fit-images';
import Direction from './blocks/direction/direction';
import Award from './blocks/award/award';
import ServiceItem from './blocks/service-item/service-item';


require('./autoload.scss');

ObjectFitImages(null, { watchMQ: true });
window.bodyLock = require('body-scroll-lock');

Array.from(document.querySelectorAll('.direction')).forEach((block) => {
	if (block) {
		new Direction(block);
	}
});

Array.from(document.querySelectorAll('.service-item')).forEach((block) => {
	if (block) {
		new ServiceItem(block);
	}
});

Array.from(document.querySelectorAll('.award')).forEach((block) => {
	if (block) {
		new Award(block);
	}
});