import { webSocketSlice } from "../slice/websocket-slice";


export const wsActions = {
  wsInit: 'webSocket/startWSConnection',
  wsSendMessage: 'webSocket/sendMessage',
  wsMessage: webSocketSlice.actions.getWSMessage,
  wsOpen: webSocketSlice.actions.successWSConnection,
  wsClose: webSocketSlice.actions.closedWSConnection,
  wsError: webSocketSlice.actions.errorWSConnection,

};
