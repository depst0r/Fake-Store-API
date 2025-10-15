import {
    store
} from './store/store.js';
import {
    fetchProducts
} from './store/slices/productsSlice.js';
import {
    showError,
    showWarning
} from './ui/errorHandler.js';
import {
    icons
} from './utils/icons.js';
import {
    fetchCategories,
    setCurrentCategory
} from './store/slices/categoriesSlice.js';

function formatCategoryName(category) {
    const names = {
        "electronics": "Электроника",
        "jewelery": "Украшения",
        "men's clothing": "Мужская одежда",
        "women's clothing": "Женская одежда",
        "all": "Все товары"
    };
    return names[category] || category;
}

export function initApp() {
    console.log('Инициализация приложения');


    store.dispatch(fetchProducts());
    store.dispatch(fetchCategories());

    store.subscribe(() => {
        const state = store.getState();
        console.log('Текущее состояние', state);
        updateUI(state);
    });
}

function updateUI(state) {
    const {
        products,
        categories
    } = state;

    if (categories.loading || products.loading) {
        // document.getElementById('app').innerHTML = '<p>Загрузка...</p>';
    } else if (categories.error || products.error) {
        // document.getElementById('app').innerHTML = `<p>Ошибка: ${categories.error || products.error}</p>`;
    } else {
        renderCategories(categories.items);
        // renderProducts(products.items);
    }
}

function renderCategories(categories) {
    const categoriesContainer = document.getElementById('categories-nav') || createCategoriesContainer();

    const categoriesHTML = categories.map(category => `
        <button class="category-btn" data-category="${category}">
            ${formatCategoryName(category)}
        </button>
    `).join('');

    categoriesContainer.innerHTML = `
        <button class="category-btn active" data-category="all">Все товары</button>
        ${categoriesHTML}
    `;

    addCategoryHandlers();
}

function createCategoriesContainer() {
    const container = document.createElement('nav');
    container.className = 'categories-nav';
    container.id = 'categories-nav';
    document.getElementById('app').prepend(container);
    return container;
}


function addCategoryHandlers() {
    const buttons = document.querySelectorAll('.category-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {

            buttons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const category = button.dataset.category;
            store.dispatch(setCurrentCategory(category));


            filterProductsByCategory(category);
        });
    });
}


function filterProductsByCategory(category) {
    const state = store.getState();
    let productsToShow = state.products.items;

    if (category !== 'all') {
        productsToShow = state.products.items.filter(
            product => product.category === category
        );
    }

    renderProducts(productsToShow);
}

function renderProducts(products) {
    try {
        const app = document.getElementById('app');

        // prettier-ignore
        const element = document.getElementById('categories-nav');
        const categoriesHTML = element ? element.outerHTML : '';

        const productsHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" width="200">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <p>⭐ ${product.rating.rate} (${product.rating.count} отзывов)</p>
            </div>
        `).join('');

        app.innerHTML = `
            ${categoriesHTML}
            <div class="products-grid">
                ${productsHTML}
            </div>
        `;


        addCategoryHandlers();

    } catch (error) {
        showError(error.message, {
            type: 'error',
            position: 'center',
            autoHide: false
        });
    }
}

function addIconsToHeader() {
    const searchBox = document.getElementById('search-box');
    const cartBtn = document.getElementById('cart-btn');


    if (searchBox) {
        searchBox.insertAdjacentHTML('afterbegin', icons.search);
    }

    if (cartBtn) {
        cartBtn.insertAdjacentHTML('afterbegin', icons.cart);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initApp();
    addIconsToHeader();
});