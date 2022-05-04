import { webSocketSlice } from "../slice/websocket-slice";
import {IWsActions} from "../types/data";


export const wsActions:IWsActions = {
  wsInit: 'webSocket/startWSConnection',
  wsSendMessage: 'webSocket/sendMessage',
  wsMessage: webSocketSlice.actions.getWSMessage,
  wsOpen: webSocketSlice.actions.successWSConnection,
  wsClose: webSocketSlice.actions.closedWSConnection,
  wsError: webSocketSlice.actions.errorWSConnection,
};
