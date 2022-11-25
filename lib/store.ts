import { configureStore } from "@reduxjs/toolkit";
import { pokemonSlice } from "./services/pokemon";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
