import { configureStore } from '@reduxjs/toolkit';
import  ingredients  from './slice/ingredients-slice'

const store = configureStore({
  reducer: ingredients,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
