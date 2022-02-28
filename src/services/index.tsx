import { configureStore } from '@reduxjs/toolkit';
import  ingredients  from './slice/ingredients-slice'
import  constructors  from './slice/constructor-slice'


const store = configureStore({
  reducer: {ingredients, constructors},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
