import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IAddToCartPayload,
  IChangeQuantityPayload,
  IChangeSizePayload,
  ICartInitialState,
} from "./cart.types";
import { cart } from "../../data/cart.data";

const initialState: ICartInitialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const isExistSize = state.items.some(
        (item) => item.size == action.payload.size
      );
      if (!isExistSize)
        state.items.push({ ...action.payload, id: state.items.length });
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload;

      state.items = state.items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                0, // Минимальное значение quantity = 1
                type === "minus" ? item.quantity - 1 : item.quantity + 1
              ),
            }
          : item
      );
    },
  },
});
// export const { addToCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer; // Экспортируем редюсер
