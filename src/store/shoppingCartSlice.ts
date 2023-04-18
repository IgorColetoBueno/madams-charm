import { IProduct } from "@/models/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IShoppingCartState {
  shoppingCart: IProduct[];
}

/**
 * Estado inicial do slice
 */
const initialState: IShoppingCartState = {
  shoppingCart: [],
};

/**
 * Criando slice da home
 */
const slice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<IProduct>) {
      state.shoppingCart.push(action.payload);
    },
    editProductFromCart(state, action: PayloadAction<IProduct>) {
      const index = state.shoppingCart.findIndex(
        (q) => q._id === action.payload._id
      );

      state.shoppingCart[index] = action.payload;
    },
    deleteProductFromCart(state, action: PayloadAction<string>) {
      state.shoppingCart.splice(
        state.shoppingCart.findIndex((q) => q._id === action.payload)
      );
    },
  },
});

/**
 * Exportando actions
 */
export const { addProductToCart, deleteProductFromCart, editProductFromCart } =
  slice.actions;

/**
 * Exportando o reducer
 */
export default slice.reducer;
