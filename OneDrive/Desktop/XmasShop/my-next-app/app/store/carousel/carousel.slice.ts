import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICarouselInitialState } from "./carousel.types";

const initialState: ICarouselInitialState = {
  selectedItemIndex: 0,
};

export const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    SelectSlide: (state, action: PayloadAction<number>) => {
      state.selectedItemIndex = action.payload;
    },
  },
});
// export const { addToCart, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer; // Экспортируем редюсер
