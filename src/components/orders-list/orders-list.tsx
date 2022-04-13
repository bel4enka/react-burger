import styles from './orders-list.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootStateOrAny, useSelector} from "react-redux";
import {statusOrder} from "../../utils/utils";
import { ImageListItem} from "../images-list/images-list";
import {selectAll} from "../../services/slice/ingredients-slice";

export const OrdersList = ({order, idIngredients}) => {
  const ingredients = useSelector(selectAll);

  const searchIngredient = value => {
    // @ts-ignore
   return ingredients.filter(ingredient => ingredient._id === value);
  }

  const searchIngredientsImages = id => {
    return id.map(item => {
      const listImages = searchIngredient(item);
      // @ts-ignore
      if (listImages.length) {
        // @ts-ignore
        return listImages[0].image;
      }
    });
  }
  const ingredientsImages = searchIngredientsImages(idIngredients);

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
            {ingredientsImages.length > 0 &&  (
              // @ts-ignore
              <ImageListItem ingredientsImages={ingredientsImages} />
            )}
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


