import styles from './feed.module.css'
import {OrdersList} from "../../components/orders-list/orders-list";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  closedWSConnection, getWSMessage,
  startWSConnection,
} from "../../services/slice/websocket-slice"
import {useEffect} from "react";
export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(startWSConnection())
    // @ts-ignore
    return () => {
      dispatch(closedWSConnection());
    };
  }, []);


  return (
    <div className={`${styles.wrap} mt-10`}>
      <h1 className={`${styles.title} text text_type_main-large pb-5`}>Лента заказов</h1>

      <section className={styles.feeds}>
        <OrdersList/>
      </section>

      <section className={styles.orders_info}>
        <div className={styles.done}>
          <h2 className={'text text_type_main-medium mb-6'}>Готовы:</h2>
          <ul className={`${styles.status_list} ${styles.status_list_color}`}>
            <li className={`${styles.status_item} text text_type_digits-default`}>034533</li>
            <li className={`${styles.status_item} text text_type_digits-default`}>034534</li>
            <li className={`${styles.status_item} text text_type_digits-default`}>034535</li>
            <li className={`${styles.status_item} text text_type_digits-default`}>034536</li>
            <li className={`${styles.status_item} text text_type_digits-default`}>034537</li>
          </ul>
        </div>

        <div className={styles.work}>
          <h2 className={'text text_type_main-medium mb-6'}>В работе:</h2>
          <ul className={styles.status_list}>
            <li className={`${styles.status_item} text text_type_digits-default`}>034538</li>
            <li className={`${styles.status_item} text text_type_digits-default`}>034539</li>
          </ul>
        </div>

        <div className={styles.all_done}>
          <h2 className={'text text_type_main-medium'}>Выполнено за все время:</h2>
          <span className={`${styles.status_all} text text_type_digits-large`}>28 752</span>
        </div>
        <div className={styles.done_today}>
          <h2 className={'text text_type_main-medium'}>Выполнено за сегодня:</h2>
          <span className={`${styles.status_all} text text_type_digits-large`}>138</span>
        </div>
      </section>
    </div>
  )
}


