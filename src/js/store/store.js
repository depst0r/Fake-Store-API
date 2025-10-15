import {
    configureStore
} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice.js';
import categoriesReducer from './slices/categoriesSlice.js';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer
    }
});

export default store;