import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        products: [],
        quantity: 0,
        subtotal: 0
  };
  
const cartSlice = createSlice({
    name: "Cart",
    // initialState: {
    //     products: [],
    //     quantity: 0,
    //     subtotal: 0
    // },
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.subtotal += action.payload.price * action.payload.quantity;
        },
        resetCart: () => initialState
    }
});

export const { addProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;