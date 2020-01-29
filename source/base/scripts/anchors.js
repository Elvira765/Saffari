import TweenLite from 'gsap';

require('gsap/ScrollToPlugin');

class Anchors {
  constructor() {
    this.anchors = [].slice.call(document.querySelectorAll('.anchor'));

    this.anchors.forEach((item) => {
      const block = document.querySelector(item.getAttribute('href'));

      item.addEventListener('click', (event) => {
        event.preventDefault();

        if (block) {
          setTimeout(() => {
            TweenLite.killAll();
            this.constructor.initAnim(block, 1.5);
          }, 100);
        }
      });
    });

    window.addEventListener('load', () => {
      if (window.location.hash.length) {
        const block = document.querySelector(window.location.hash);
        if (block) {
          TweenLite.killAll();
          this.constructor.initAnim(block, 0);
        }
      }
    });
  }

  static initAnim(block, scrollTime) {
    const scroll = window.pageYOffset;
    const point = (block.getBoundingClientRect().top + scroll) - 120;
    const pointMath = Math.round(point);

    TweenLite.to(window, scrollTime, {
      ease: Power2.easeOut,
      scrollTo: {
        y: pointMath,
        autoKill: false,
      },
    });
  }
}
export default Anchors;
