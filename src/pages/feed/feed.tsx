import React, {FC} from "react";
import styles from './feed.module.css'
import {OrdersList} from "../../components/orders-list/orders-list";
import {nanoid} from "@reduxjs/toolkit";
import {useWebSocket} from "../../hooks/webSoket.hook";
import {useAppSelector} from "../../hooks/store";


export const Feed:FC = () => {
  const page = 'feed'
  useWebSocket()

  const {feedsOrders, feed} = useAppSelector(state => state.webSocket);

  const findNumbers = (status:string) => {
    return feedsOrders.filter((item) => item.status === status);
  }

   return  (

      <div className={`${styles.wrap} mt-10`}>
        <h1 className={`${styles.title} text text_type_main-large pb-5`}>Лента
          заказов</h1>

        <section className={styles.feeds}>
          {feedsOrders &&
            feedsOrders.map((item:any) => (

              <OrdersList key={item._id} order={item} idIngredients={item.ingredients} page={page} />
            ))
          }
        </section>

        <section className={styles.orders_info}>
          <div className={styles.done}>
            <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
            <ul className={`${styles.status_list} ${styles.status_list_color}`}>
              {feedsOrders &&
                (findNumbers('done').map((item)=>
                  <li key={nanoid()} className={`${styles.status_item} text text_type_digits-default`}>{item.number}
                  </li>))}
            </ul>
          </div>

          <div className={styles.work}>
            <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
            <ul className={styles.status_list}>
              {feedsOrders &&
                (findNumbers('pending').map((item)=>
              <li key={nanoid()} className={`${styles.status_item} text text_type_digits-default`}>{item.number}
              </li>))}
            </ul>
          </div>

          <div className={styles.all_done}>
            <h2 className={'text text_type_main-medium'}>Выполнено за все
              время:</h2>
            {feed &&
            <span className={`${styles.status_all} text text_type_digits-large`}>{feed.total}</span>}
          </div>
          <div className={styles.done_today}>
            <h2 className={'text text_type_main-medium'}>Выполнено за
              сегодня:</h2>
            {feed &&
            <span
              className={`${styles.status_all} text text_type_digits-large`}>{feed.totalToday}</span>}
          </div>
        </section>
      </div>

    )

}


