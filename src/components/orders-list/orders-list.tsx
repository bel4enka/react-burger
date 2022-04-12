import styles from './orders-list.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootStateOrAny, useSelector} from "react-redux";
import {statusOrder} from "../../utils/utils";
import { ImageListItem} from "../images-list/images-list";
import {selectAll} from "../../services/slice/ingredients-slice";

export const OrdersList = ({order}) => {

  const idIngredients = order.ingredients;

  return (
    <>
      <a className={styles.item} href='#'>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#{order.number}</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>{order.createdAt}</time>
        </div>
        <h2 className={'text text_type_main-medium'}>{order.name}</h2>
        <span className={'text text_type_main-small'}>{statusOrder(order.status)}</span>
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
            {idIngredients.map((id, i)=>
              // @ts-ignore
                  <ImageListItem id={id} key={id+i} />)}
          </ul>
          <div className={styles.price}>
            <span className={'text_type_digits-default'}>123</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </a>

    </>
  )
}


