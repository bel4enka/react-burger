import {
  configureStore
} from '@reduxjs/toolkit';
import  ingredients  from './slice/ingredients-slice'
import  constructors  from './slice/constructor-slice'
import auth from './slice/auth-sclice'
import {socketMiddleware} from "./middleware/socketMiddleware";
import {wsUrl} from '../utils/utils'
import webSocket from "./slice/websocket-slice";
import {wsActions} from "./actions/wsActions";




const store = configureStore({
    reducer: {ingredients, auth, constructors, webSocket },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware(wsActions )),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
