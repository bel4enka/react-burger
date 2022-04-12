import {OrdersList} from "../../components/orders-list/orders-list";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import styles from "./orders.module.css";


export const Orders = () => {

  return (
    <>
      <div className={styles.wrap}>
        <ProfileMenu/>
        <section className={styles.orders_list}>
          {/*<OrdersList/>*/}
        </section>
     </div>
    </>

  )
}


