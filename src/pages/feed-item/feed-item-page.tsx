import {useEffect} from "react";
import {
  closedWSConnection,
  startWSConnection
} from "../../services/slice/websocket-slice";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {selectAll} from "../../services/slice/ingredients-slice";
import {useParams} from "react-router-dom";
import {OrderItem} from "../order-item/order-item";

///Лишнюю страницу удалить!




///Лишнюю страницу удалить!




///Лишнюю страницу удалить!

export const FeedItemPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(startWSConnection())
    // @ts-ignore
    return () => {
      dispatch(closedWSConnection());
    };
  }, []);
  const ingredients = useSelector(selectAll);
  const { id } = useParams()

  {/*// @ts-ignore*/}
  // const ingredient =  ingredients.filter(item => item._id === id);

  const {feedsOrders} = useSelector((state:RootStateOrAny) => state.webSocket);

  let orders = (feedsOrders) =>feedsOrders.filter(item => item._id === id)[0]

  const order = orders(feedsOrders)
  return (
    <>
      {orders &&
        <OrderItem/>
      }
    </>
  )
}


