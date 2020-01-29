import Swiper from 'swiper/dist/js/swiper';

export default class ServiceItem {
	constructor(parent) {
		const options = {
			loop: true,
			navigation: {
				nextEl: '.service-item__arrow',
				prevEl: '.service-item__arrow',
			},
		};
		new Swiper(parent, options);
	}
}