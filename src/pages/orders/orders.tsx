import {OrdersList} from "../../components/orders-list/orders-list";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import styles from "./orders.module.css";
import {RootStateOrAny, useSelector} from "react-redux";
import React from "react";

import {useWebSocket} from "../../hooks/webSoket.hook";


export const Orders = () => {

  useWebSocket()
  const page = 'profile/orders'
  const {feedsOrders, feed} = useSelector((state:RootStateOrAny) => state.webSocket);

  return (
    <>
      <div className={styles.wrap}>
        <ProfileMenu/>
        <section className={styles.orders_list}>
          {feedsOrders &&
            feedsOrders.map((item:any) => (
              // @ts-ignore
              <OrdersList key={item._id} order={item} idIngredients={item.ingredients} page={page}/>
            ))
          }
        </section>
     </div>
    </>

  )
}


