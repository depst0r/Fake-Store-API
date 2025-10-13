document.addEventListener('DOMContentLoaded', () => {

    const isToggle = (activeClass, id) => {
        const elem = document.getElementById(id);
        elem.addEventListener('click', () => {
            elem.classList.toggle(activeClass)
        })
    }

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
            });

            document.addEventListener('click', e => {
                if (!searchBox.contains(e.target)) {
                    inputSearch.classList.remove('header__search-input--active');
                    logo.classList.remove('header__logo--show');
                }
            });

        } catch (error) {
            console.error('Ошибка в searchShow:', error);
        }
    }

    searchShow()
    isToggle('header__hamburger--active', 'hamburger')

});