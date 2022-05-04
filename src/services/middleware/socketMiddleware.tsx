import {IWsActions} from "../types/data";
import {Middleware} from "redux";

export const socketMiddleware = ( wsActions: IWsActions): Middleware => {
  return store => {
    let socket: WebSocket | null = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const { wsInit, wsSendMessage, wsOpen, wsClose, wsError, wsMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = event => {
          console.log("Соединение установлено")
          dispatch(wsOpen(null));
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onerror = event => {
          dispatch(wsError(null));
        };

        socket.onclose = event => {
          dispatch(wsClose());
        };

        if (type === wsSendMessage) {
          console.log('лала')
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  }
};
