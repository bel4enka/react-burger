import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  test: null,
  connect: false,
  errorWS: false,
  feedsOrders: null,
  feed: null,
}


export const webSocketSlice = createSlice({
  name: 'webSocket',
  initialState,
  reducers: {
    startWSConnection: (state, action) => {
      state.test = 'startWSConnection'
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
  errorWSConnection,
  closedWSConnection,
  getWSMessage,
} = actions;
