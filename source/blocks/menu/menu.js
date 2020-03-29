
function burgerMenu(selector) {
    let menu = $(selector);
    let button = menu.find('.menu__burger-button');
    let links = menu.find('.menu__burger-link');
    let overlay = menu.find('.menu__burger-overlay');

    button.on('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    links.on('click',() => toggleMenu());
    overlay.on('click',() => toggleMenu());

    function toggleMenu() {
        menu.toggleClass('.menu__burger--active');

        if (menu.hasClass('.menu__burger--active')) {
            $('body').css('overflow', 'hidden')
        } else {
            $('body').css('overflow', 'visible')
        }
    }
}

burgerMenu('.menu__burger');