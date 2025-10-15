import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    FakeStoreAPI
} from '../../api/fakeStoreAPI.js';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async() => {
        const categories = await FakeStoreAPI.getCategories();
        return categories;
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        loading: false,
        error: null,
        currentCategory: 'all'
    },
    reducers: {
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        clearCurrentCategory: (state) => {
            state.currentCategory = 'all';
        },
        setCategoriesLoading: (state, action) => {
            state.loading = action.payload;
        },
        resetCategoriesError: (state) => {
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});


export const {
    setCurrentCategory,
    clearCurrentCategory,
    setCategoriesLoading,
    resetCategoriesError
} = categoriesSlice.actions;

export default categoriesSlice.reducer;


export const selectCategories = (state) => state.categories.items;
export const selectCurrentCategory = (state) => state.categories.currentCategory;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;


export const formatCategoryName = (category) => {
    const names = {
        "electronics": "Электроника",
        "jewelery": "Украшения",
        "men's clothing": "Мужская одежда",
        "women's clothing": "Женская одежда",
        "all": "Все товары"
    };
    return names[category] || category;
};


export const getFormattedCategories = (state) => {
    const categories = state.categories.items;
    return [{
            value: 'all',
            label: 'Все товары'
        },
        ...categories.map(category => ({
            value: category,
            label: formatCategoryName(category)
        }))
    ];
};