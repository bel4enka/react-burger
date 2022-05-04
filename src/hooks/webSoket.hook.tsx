import {useEffect} from "react";
import { useLocation } from 'react-router-dom';
import {
  closedWSConnection,
  startWSConnection
} from "../services/slice/websocket-slice";
import {getCookie, wsUrl} from "../utils/utils";
import {useAppDispatch} from "./store";

export const useWebSocket = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.pathname.startsWith('/feed')) {
      dispatch(startWSConnection(`${wsUrl}/all`));
    }
    else {
      const accessToken = getCookie('accessToken').replace('Bearer ','');
      dispatch(startWSConnection(`${wsUrl}?token=${accessToken}`));
    }
    return () => {dispatch(closedWSConnection())}
  }, [location])
}
