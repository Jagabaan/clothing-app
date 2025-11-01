import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice/index.js";
import AdminProductsSlice from "./admin/products-slice"
import shoppingProductSlice from "./shop/products-slice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : AdminProductsSlice,
        shopProducts : shoppingProductSlice
    },
});
export default store;