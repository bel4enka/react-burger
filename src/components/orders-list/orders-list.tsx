import styles from './orders-list.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createData, statusOrder} from "../../utils/utils";
import { ImageListItem} from "../images-list/images-list";
import { Link, useLocation } from 'react-router-dom';
import {FC} from "react";
import {TOrder} from "../../services/types/data";
import {useAppSelector} from "../../hooks/store";

interface IOrdersListProps {
  order:TOrder,
  idIngredients: string[],
  page: string
}
export const OrdersList:FC<IOrdersListProps> = ({order, idIngredients, page}) => {
  const {ingredients} = useAppSelector(state => state.ingredients);
  const location = useLocation();

  const searchIngredient = (value: string) => {
   return ingredients.filter((ingredient) => ingredient._id === value);
  }

  const searchIngredientsImages = (id: string[]) => {
    return id.map((item:  string) => {
      const listImages = searchIngredient(item);
      if (listImages.length) {
        return listImages[0].image;
      }
    });
  }

  const searchIngredientsPrice = (id: string[]) => {
    return id.map((item:  string) => {
      const priceList = searchIngredient(item);
      if (priceList.length) {
        return priceList[0].price;
      }
    });
  }
  const price = searchIngredientsPrice(idIngredients).reduce((acc: number, price: number) => acc + price, 0)
  return (
    <>
      <Link className={styles.item} to={{ pathname: `/${page}/${order._id}`, state: { background: location } }}>
        <div className={styles.item_header}>
          <span className={`${styles.item_id} text_type_digits-default`}>#{order.number}</span>
          <time className={`${styles.item_date} text text_color_inactive text_type_main-default`}>{createData(order.createdAt)}</time>
        </div>
        <h2 className={'text text_type_main-medium'}>{order.name}</h2>
        {location.pathname.startsWith('/profile') &&
          <span className={'text text_type_main-small'}>{statusOrder(order.status)}</span>
        }
        <div className={styles.item_desc}>
          <ul className={styles.desc_images}>
              <ImageListItem ingredientsImages={searchIngredientsImages(idIngredients)} />
          </ul>
          <div className={styles.price}>
            {price &&
            <span className={'text_type_digits-default'}>{price}</span>}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>

    </>
  )
}
