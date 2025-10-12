import '/src/scss/main.scss';
import '/src/js/app.js';
import '/src/js/utils/github.js';
import '/src/js/animations.js';
import '/src/js/api/fakeStoreAPI.js';
import '/src/js/store/store.js';
import '/src/js/store/slices/cartSlice.js';
import '/src/js/store/slices/productsSlice.js';
import {
    initApp
} from './js/app.js';

document.addEventListener('DOMContentLoaded', initApp);