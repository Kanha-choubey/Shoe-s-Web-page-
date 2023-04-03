import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartState,
  selectTotalAmount,
  selectTotalQTY,
  seslctCartItems,
  setClearCartItemQTY,
  setCloseCart,
  setGetTotal,
} from "../app/CartSlice";
import CartCount from "./Cart/CartCount";
import CartEmpty from "./Cart/CartEmpty";
import CartItem from "./Cart/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const ifCartState = useSelector(selectCartState);
  const cartItems = useSelector(seslctCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);

  useEffect(() => {
    dispatch(setGetTotal());
  }, [cartItems, dispatch]);
  const onCartToggle = () => {
    dispatch(
      setCloseCart({
        cartState: false,
      })
    );
  };
  const cartEmpty = () => {
    dispatch(setClearCartItemQTY());
  };
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-300 w-full h-screen opacity-100 z-[250] 
        ${
          ifCartState
            ? "opacity-100 visible translate-x-0  "
            : "opacity-0 invisible translate-x-8"
        }`}
      >
        <div
          className={`blur-effect-theme  h-screen max-w-xl w-full absolute right-0`}
        >
          <CartCount
            totalQTY={totalQTY}
            onCartToggle={onCartToggle}
            cartEmpty={cartEmpty}
          />
          {cartItems.length === 0 ? (
            <CartEmpty onCartToggle={onCartToggle} />
          ) : (
            <div>
              <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5  overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
                {cartItems?.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </div>
              <div className="fixed bottom-0 bg-white w-full px-5 grid items-center">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold">SubTotal</h1>
                  <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                    $ {totalAmount}
                  </h1>
                </div>
                <div className="grid items-center gap-2">
                  <p className="text-sm font-medium text-center ">
                    Taxes and Shipping Will calculate At Shipping
                  </p>
                  <button
                    className="button-theme bg-theme-cart text-white"
                    type="button"
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
