import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { cartSlice } from "./cart/cart.slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { carouselSlice } from "./carousel/carousel.slice";

const persistConfig = {
  key: "xmas-shop",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  carousel: carouselSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export const store = configureStore({
//   reducer: rootReducer,
// });

export const persistor = persistStore(store);
export type TypeRootState = ReturnType<typeof rootReducer>;
