import {
    store
} from './store/store.js';
import {
    fetchProducts
} from './store/slices/productsSlice.js';

export function initApp() {
    console.log('Инициализация приложения');
    store.dispatch(fetchProducts());

    store.subscribe(() => {
        const state = store.getState();
        console.log('Текущее состояние', state);
        updateUI(state);
    });
}

function updateUI(state) {
    const {
        products
    } = state;

    if (products.loading) {
        document.getElementById('app').innerHTML = '<p>Загрузка товаров</p>';
    } else if (products.error) {
        document.getElementById('app').innerHTML = `<p>Ошибка: ${products.error}</p>`;
    } else {
        renderProducts(products.items);
    }
}

function renderProducts(products) {
    try {
        const app = document.getElementById('app');
        const productsHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" width="200">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>⭐ ${product.rating.rate} (${product.rating.count} отзывов)</p>
        </div>
    `).join('');

        app.innerHTML = `
        <div class="products-grid">
            ${productsHTML}
        </div>
    `;
    } catch (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `<h3>⚠️ ${error.message} ⚠️</h3>`;
        document.body.appendChild(errorDiv);
    }

}