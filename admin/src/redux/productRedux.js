import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "Product",
    initialState: {
        products: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getProductStart: (state) => {
            state.isFetching =  true;
        },
        getProductSuccess: (state, action) => {
            state.isFetching =  false;
            state.products =  action.payload;
        },
        getProductFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        addProductStart: (state) => {
            state.isFetching =  true;
        },
        addProductSuccess: (state, action) => {
            state.isFetching =  false;
            state.products.push(action.payload);
        },
        addProductFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        updateProductStart: (state) => {
            state.isFetching =  true;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching =  false;
            state.products[state.products.findIndex((item) => item._id === action.payload.id)] = action.payload.product
        },
        updateProductFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        },
        deleteProductStart: (state) => {
            state.isFetching =  true;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching =  false;
            state.products.splice(state.products.findIndex((item) => item._id === action.payload), 1);
        },
        deleteProductFailed: (state) => {
            state.isFetching =  false;
            state.error =  true;
        }
    }
});

export const { getProductStart, getProductSuccess, getProductFailed, 
                addProductStart, addProductSuccess, addProductFailed,
                updateProductStart, updateProductSuccess, updateProductFailed,
                deleteProductStart, deleteProductSuccess, deleteProductFailed } = productSlice.actions;
export default productSlice.reducer;