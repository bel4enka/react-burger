import {createSlice} from "@reduxjs/toolkit";
import {TIngredient, TOrder} from "../types/data";

interface IWebSocketState {
  connect: boolean,
  errorWS: boolean,
  feedsOrders: TOrder[],
  feed: {total: string, totalToday: string} | null,
}

const initialState:IWebSocketState = {
  connect: false,
  errorWS: false,
  feedsOrders: [],
  feed: null,
}


export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startWSConnection: (state, action) => {
    },
    successWSConnection: (state, action) => {
      state.connect = true
    },
    getWSMessage: (state, action) => {
      state.feedsOrders = action.payload.orders;
      state.feed = {total: action.payload.total, totalToday: action.payload.totalToday};
    },
    sendMessage: (state, action) => {
    },

    closedWSConnection: (state) => {
      state.connect = false;
    },

    errorWSConnection: (state, action) => {
      state.errorWS = true
    },
  },

});


const {actions, reducer} = webSocketSlice;
export default reducer;

export const {
  startWSConnection,
  successWSConnection,
  closedWSConnection,
} = actions;
