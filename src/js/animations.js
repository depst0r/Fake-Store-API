document.addEventListener('DOMContentLoaded', () => {

    const addToggleClass = () => {
        const elem = document.getElementById('hamburger');
        const menu = document.getElementById('mobile-nav');

        if (!elem || !menu) {
            console.warn('Hamburger или меню не найдены');
            return;
        }

        elem.addEventListener('click', () => {
            elem.classList.toggle('header__hamburger--active');
            menu.classList.toggle('mobile-nav--active');
        });
    };


    const searchShow = () => {
        try {
            const searchBox = document.querySelector('#search-box');
            const inputSearch = document.querySelector('input[data-search]');
            const logo = document.querySelector('.header__logo');

            searchBox.addEventListener('click', e => {
                e.stopPropagation();

                const isActive = inputSearch.classList.contains('header__search-input--active');

                if (isActive) {

                    inputSearch.classList.remove('header__search-input--active');
                    inputSearch.value = '';
                    logo.classList.remove('header__logo--show');
                } else {

                    inputSearch.classList.add('header__search-input--active');
                    logo.classList.add('header__logo--show');
                    inputSearch.focus();
                }
            })

        } catch (error) {
            console.error('Ошибка в searchShow:', error);
        }
    }

    searchShow()
    addToggleClass()

});