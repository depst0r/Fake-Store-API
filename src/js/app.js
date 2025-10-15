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

    updateCartCounter();

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

            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);

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
            <div class="products__card" data-product-id="${product.id}">
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

        document.getElementById('back-to-categories').addEventListener('click', () => {
            store.dispatch(setCurrentCategory('all'));
            renderCategories(store.getState().categories.items);
        });

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
            const productId = productCard.dataset.productId;

            const state = store.getState();
            const product = state.products.items.find(p => p.id == productId);

            if (!product) {
                console.error('Товар не найден');
                return;
            }

            addToCart(product);

            button.textContent = 'Добавлено!';
            button.style.background = '#28a745';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.background = '';
                button.disabled = false;
            }, 2000);


            showSuccessMessage(`Товар "${product.title}" добавлен в корзину`);
        });
    });
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {

        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            rating: product.rating,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCounter();

    console.log('Товар добавлен в корзину:', product);
}

function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCounter = document.querySelector('.header__cart-counter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">✓</span>
            <span class="notification__text">${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            openCartModal();
        });
    }
}

function openCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        showWarning('Корзина пуста');
        return;
    }


    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'cart-modal__content';
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    const cartItemsHTML = cart.map(item => `
        <div class="cart-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid #eee;">
            <img src="${item.image}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: contain;">
            <div style="flex: 1;">
                <h4 style="margin: 0 0 0.5rem 0;">${item.title}</h4>
                <p style="margin: 0; color: #666;">$${item.price} x ${item.quantity}</p>
            </div>
            <div style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    modalContent.innerHTML = `
        <div class="cart-modal__header" style="display: flex; justify-content: between; align-items: center; margin-bottom: 1rem;">
            <h2 style="margin: 0;">Корзина</h2>
            <button class="cart-modal__close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
        </div>
        <div class="cart-modal__items">
            ${cartItemsHTML}
        </div>
        <div class="cart-modal__total" style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #333; font-size: 1.25rem; font-weight: bold;">
            Итого: $${total.toFixed(2)}
        </div>
        <button class="cart-modal__checkout" style="width: 100%; padding: 12px; background: #007bff; color: white; border: none; border-radius: 8px; margin-top: 1rem; cursor: pointer;">
            Оформить заказ
        </button>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    modalContent.querySelector('.cart-modal__close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modalContent.querySelector('.cart-modal__checkout').addEventListener('click', () => {
        showSuccessMessage('Заказ оформлен!');
        localStorage.removeItem('cart');
        updateCartCounter();
        document.body.removeChild(modal);
    });
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .products__action:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .header__cart {
        position: relative;
        cursor: pointer;
    }
    
    .header__cart-counter {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #ff4444;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

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
    initCart();
});