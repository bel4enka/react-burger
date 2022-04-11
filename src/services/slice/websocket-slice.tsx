import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  test: null,
  connect: false,
  errorWS: false,
  orders: null
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

      state.orders = action.payload;
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


export default webSocketSlice.reducer;
export const {
  startWSConnection,
  successWSConnection,
  errorWSConnection,
  closedWSConnection,
  getWSMessage,
} = webSocketSlice.actions
