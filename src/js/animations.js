document.addEventListener('DOMContentLoaded', () => {

    const isToggle = (activeClass, id) => {
        const elem = document.getElementById(id);
        elem.addEventListener('click', () => {
            elem.classList.toggle(activeClass)
        })
    }

    isToggle('header__hamburger--active', 'hamburger')
});