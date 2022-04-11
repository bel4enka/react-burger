export const socketMiddleware = ( wsUrl, wsActions) => {
  return store => {
    let socket = null;

    return next => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const { wsInit, wsSendMessage, wsOpen, wsClose, wsError, wsMessage } = wsActions;

      if (type === wsInit) {

        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = event => {
          console.log("Соединение установлено")
          dispatch(wsOpen());
        };
        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          console.log(`Получены данные: ${event.data}`)
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onerror = event => {
          dispatch(wsError());
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
