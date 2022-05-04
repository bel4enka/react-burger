import {OrdersList} from "../../components/orders-list/orders-list";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import styles from "./orders.module.css";
import React, {FC} from "react";
import {useWebSocket} from "../../hooks/webSoket.hook";
import {useAppSelector} from "../../hooks/store";


export const Orders:FC = () => {

  useWebSocket()
  const page = 'profile/orders'
  const {feedsOrders} = useAppSelector(state => state.webSocket);

  return (
    <>
      <div className={styles.wrap}>
        <ProfileMenu/>
        <section className={styles.orders_list}>
          {feedsOrders.length &&
            feedsOrders.map((item:any) => (
              <OrdersList key={item._id} order={item} idIngredients={item.ingredients} page={page}/>
            ))
          }
        </section>
     </div>
    </>

  )
}


