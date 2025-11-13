import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../sevices/config.js";


const getProducts = createAsyncThunk("products/getProducts", () => {
	return api.get("products").then(res => res.data)
})

const productsSlice = createSlice({
	name: "products",
	initialState: {loading: false, products: [], error: ""},
	extraReducers: (builder) => {
		builder.addCase(getProducts.pending, (state) => {
			state.loading = true;
		})
		builder.addCase(getProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload;
			state.error = "";
		})
		builder.addCase(getProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message
		})
	}
})

export default productsSlice.reducer
export {getProducts}