import {createSlice} from "@reduxjs/toolkit";
import {sumProducts} from "../../helper/helper.js";

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    checkOut: false,
    actionType: "",
  },
  reducers: {
    incrementItem(state, action) {
      const indexIncrease = state.selectedItems.findIndex((item) => item.id === action.payload.id);
      state.selectedItems[indexIncrease]?.quantity && state.selectedItems[indexIncrease].quantity++;
      state.total = sumProducts(state.selectedItems).total;
      state.itemsCounter = sumProducts(state.selectedItems).itemsCounter;
      state.actionType = "INCREASE";
    },
    decrementItem(state, action) {
      const indexDecrease = state.selectedItems.findIndex((item) => item.id === action.payload.id);
      state.selectedItems[indexDecrease]?.quantity > 1 && state.selectedItems[indexDecrease].quantity--;
      state.total = sumProducts(state.selectedItems).total;
      state.itemsCounter = sumProducts(state.selectedItems).itemsCounter;
      state.actionType = "DECREASE";
    },
    removeItem(state, action) {
      const newSelectedItems = state.selectedItems.filter((item) => item.id !== action.payload.id);
      state.selectedItems = [...newSelectedItems];
      state.total = sumProducts(state.selectedItems).total;
      state.itemsCounter = sumProducts(state.selectedItems).itemsCounter;
      state.actionType = "REMOVE";
    },
    addItem(state, action) {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({...action.payload, quantity: 1});
      }
      state.total = sumProducts(state.selectedItems).total;
      state.itemsCounter = sumProducts(state.selectedItems).itemsCounter;
      state.checkOut = false;
      state.actionType = "ADD";
    },
    checkOut(state) {
      state.selectedItems = [];
      state.itemsCounter = 0;
      state.total = 0;
      state.checkOut = true;
      state.actionType = "CHECKOUT";
    },
  },
});

export default cartSlice.reducer;
export const {incrementItem, decrementItem, removeItem, addItem, checkOut} = cartSlice.actions;
