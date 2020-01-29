import Swiper from 'swiper/dist/js/swiper';

export default class Award {
	constructor(parent) {
		const el = parent.querySelector('.award__counter');
		const options = {
			loop: true,
			navigation: {
				nextEl: '.award__next',
				prevEl: '.award__prev',
			},
			on: {
				slideChange: function (e) {
					if (el) {
						el.innerText = this.realIndex + 1;
					}
				}
			}
		};
		const container = parent.querySelector('.award__slider');
		new Swiper(container, options);
	}
}