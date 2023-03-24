import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [], // Let Suppose Database
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        toast.success(`${action.payload.title} Added to Cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { setCloseCart, setOpenCart, setAddItemToCart } =
  CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const seslctCartItems = (state) => state.cart.cartItems;
export default CartSlice.reducer;
