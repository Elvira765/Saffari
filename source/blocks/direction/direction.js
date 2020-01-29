import Swiper from 'swiper/dist/js/swiper';

export default class Direction {
	constructor(parent) {
		const options = {
			loop: true,
			navigation: {
				nextEl: '.direction__arrow',
				prevEl: '.direction__arrow',
			},
		};
		const container = parent.querySelector('.direction__slider');
		new Swiper(container, options);
	}
}
