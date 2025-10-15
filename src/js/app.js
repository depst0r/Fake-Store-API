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

// Картинки для категорий (можно заменить на свои)
const categoryImages = {
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop",
    "men's clothing": "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&h=200&fit=crop",
    "women's clothing": "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop",
    "all": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop"
};

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
        showLoading();
    } else if (categories.error || products.error) {
        showError(categories.error || products.error);
    } else {
        if (state.categories.currentCategory === 'all' || !state.categories.currentCategory) {
            renderCategories(categories.items);
        } else {
            filterProductsByCategory(state.categories.currentCategory);
        }
    }
}

function showLoading() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="loading">
            <div class="loading__spinner"></div>
            <p class="loading__text">Загрузка...</p>
        </div>
    `;
}

function renderCategories(categories) {
    const app = document.getElementById('app');

    const categoriesHTML = categories.map(category => `
        <div class="categories__card" data-category="${category}">
            <div class="categories__image">
                <img src="${categoryImages[category]}" alt="${formatCategoryName(category)}">
                <div class="categories__overlay">
                    <span class="categories__btn">Выбрать</span>
                </div>
            </div>
            <div class="categories__content">
                <h3 class="categories__name">${formatCategoryName(category)}</h3>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <section class="categories">
            <div class="categories__container">
                <div class="categories__header">
                    <h1 class="categories__title">Категории товаров</h1>
                    <p class="categories__subtitle">Выберите интересующую вас категорию</p>
                </div>
                <div class="categories__grid">
                    ${categoriesHTML}
                </div>
            </div>
        </section>
    `;

    addCategoryHandlers();
}

function addCategoryHandlers() {
    const categoryCards = document.querySelectorAll('.categories__card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;

            // Показываем анимацию нажатия
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);

            // Устанавливаем категорию и фильтруем товары
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

    renderProducts(productsToShow, category);
}

function renderProducts(products, category) {
    try {
        const app = document.getElementById('app');

        const productsHTML = products.map(product => `
            <div class="products__card">
                <div class="products__image">
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                </div>
                <div class="products__content">
                    <h3 class="products__name">${product.title}</h3>
                    <p class="products__category">${formatCategoryName(product.category)}</p>
                    <div class="products__price">$${product.price}</div>
                    <div class="products__rating">
                        ⭐ ${product.rating.rate} <span>(${product.rating.count} отзывов)</span>
                    </div>
                    <button class="products__action">В корзину</button>
                </div>
            </div>
        `).join('');

        app.innerHTML = `
            <section class="products">
                <div class="products__container">
                    <div class="products__header">
                        <button class="products__back" id="back-to-categories">
                            ← Вернуться к категориям
                        </button>
                        <h1 class="products__title">${formatCategoryName(category)}</h1>
                        <p class="products__count">Найдено товаров: ${products.length}</p>
                    </div>
                    <div class="products__grid">
                        ${productsHTML}
                    </div>
                </div>
            </section>
        `;

        // Добавляем обработчик для кнопки "Назад"
        document.getElementById('back-to-categories').addEventListener('click', () => {
            store.dispatch(setCurrentCategory('all'));
            renderCategories(store.getState().categories.items);
        });

        // Добавляем обработчики для кнопок "В корзину"
        addProductHandlers();

    } catch (error) {
        showError(error.message, {
            type: 'error',
            position: 'center',
            autoHide: false
        });
    }
}

function addProductHandlers() {
    const addToCartButtons = document.querySelectorAll('.products__action');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = button.closest('.products__card');
            const productName = productCard.querySelector('.products__name').textContent;

            // Анимация добавления в корзину
            button.textContent = 'Добавлено!';
            button.style.background = '#28a745';

            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.background = '';
            }, 2000);

            console.log(`Товар "${productName}" добавлен в корзину`);
            // Здесь можно добавить логику добавления в корзину
        });
    });
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