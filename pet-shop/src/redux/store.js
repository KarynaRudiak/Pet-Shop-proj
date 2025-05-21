import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice'; 
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        modal: modalReducer,  
        cart: cartReducer
    }
});

export default store;
