import { configureStore } from '@reduxjs/toolkit';
import  ingredients  from './slice/ingredients-slice'
import  constructors  from './slice/constructor-slice'
import auth from './slice/auth-sclice'


const store = configureStore({
  reducer: {ingredients, auth, constructors },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
