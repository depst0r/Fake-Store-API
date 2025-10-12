import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import {
    FakeStoreAPI
} from '../../api/fakeStoreAPI.js';
import {
    showApiError,
    showNetworkError
} from '/src/js/ui/errorHandler.js';



export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async() => {
        try {
            const products = await FakeStoreAPI.getProducts();
            return products;
        } catch (error) {
            showApiError(error);
            return rejectWithValue(error.message);
        }

    }
);


const productsSlice = createSlice({
    name: 'products',

    initialState: {
        items: [],
        loading: false,
        error: null
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })


        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default productsSlice.reducer;