
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading : false,
    productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllProducts', async (FormData)=> {
    console.log(fetchAllFilteredProducts,'fetchAllFilteredProducts')
 const result = await axios.get('http://localhost:3000/api/shop/products/get' )
 console.log(result,'result in thunk')
 return result?.data.data;
})


const shoppingProductSlice = createSlice({
    name: "shoppingProducts",
    initialState,
    reducers: {},
    extraReducers : (builder)=> {
        builder.addCase(fetchAllFilteredProducts.pending, (state,action)=> {
            state.isLoading = true
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action)=> {
            console.log("Fetched products:", action.payload);
            state.isLoading = false
            state.productList = action.payload
        }).addCase(fetchAllFilteredProducts.rejected, (state, action)=> {
            
            state.isLoading = false
            state.productList= []
        })
    }
})

export default shoppingProductSlice.reducer;