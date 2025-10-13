document.addEventListener('DOMContentLoaded', () => {

    const isToggle = (activeClass, id) => {
        const elem = document.getElementById(id);
        elem.addEventListener('click', () => {
            elem.classList.toggle(activeClass)
        })
    }

    const searcShow = () => {
        try {
            const btn = document.querySelector('#search-box');
            const inputSearch = document.querySelector('input[data-search]');
            const logo = document.querySelector('.header__logo');
            btn.addEventListener('click', () => {
                inputSearch.classList.toggle('header__search-input--active')
                if (!inputSearch.classList.contains('.header__search-input--active')) {
                    inputSearch.value = ''
                    logo.classList.toggle('header__logo--show')
                }
            })
        } catch (error) {

        }


    }

    searcShow()
    isToggle('header__hamburger--active', 'hamburger')

});