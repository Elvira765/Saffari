class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.headerBtn = document.querySelector('.header__btn-menu');
    this.moreItems = [].slice.call(document.querySelectorAll('.header__list-item--more'));

    if (this.header && this.headerBtn) this.initEvents();
  }

  initEvents() {
    this.headerBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.header.classList.toggle('header--open');
      this.headerBtn.classList.toggle('header__btn-menu--open');

      if (this.headerBtn.classList.contains('header__btn-menu--open')) {
        window.bodyLock.disableBodyScroll(this.header);
      } else {
        window.bodyLock.enableBodyScroll(this.header);
      }
    });

    this.moreItems.forEach((item) => {
      const btn = item.querySelector('.header__list-link');

      btn.addEventListener('click', (event) => {
        if (window.innerWidth <= 1023) {
          event.preventDefault();

          item.classList.toggle('header__list-item--open');
        }
      });
    });
  }
}
export default Header;
