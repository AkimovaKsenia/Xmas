import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { cartSlice } from "../store/cart/cart.slice";
import { useMemo } from "react";
import { carouselSlice } from "../store/carousel/carousel.slice";

const rootAction = {
  ...cartSlice.actions,
  ...carouselSlice.actions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
};
