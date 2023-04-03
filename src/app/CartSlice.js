import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [], // Let Suppose Database
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
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
    setRemovieItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} Removed From Cart`);
    },
    setIncreaseItemQTY: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (cartIndex >= 0) {
        state.cartItems[cartIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY: (state, action) => {
      const cartIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[cartIndex].cartQuantity > 1) {
        state.cartItems[cartIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decrease`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setClearCartItemQTY: (state, action) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setGetTotal: (state, action) => {
      let { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;
          cartTotal.totalAmount += totalPrice;
          cartTotal.totalQTY += cartQuantity;
          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQTY;
    },
  },
});

export const {
  setCloseCart,
  setOpenCart,
  setAddItemToCart,
  setRemovieItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItemQTY,
  setGetTotal,
} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const seslctCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;
export default CartSlice.reducer;
