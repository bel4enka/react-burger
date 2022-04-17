import styles from './orders-list.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootStateOrAny, useSelector} from "react-redux";
import {createData, statusOrder} from "../../utils/utils";
import { ImageListItem} from "../images-list/images-list";
import {selectAll} from "../../services/slice/ingredients-slice";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";


export const OrdersList = ({order, idIngredients, page}) => {
  const ingredients = useSelector(selectAll);
  const location = useLocation();

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

  const searchIngredientsPrice = id => {
    return id.map(item => {
      const priceList = searchIngredient(item);
      // @ts-ignore
      if (priceList.length) {
        // @ts-ignore
        return priceList[0].price;
      }
    });
  }
  const price = searchIngredientsPrice(idIngredients).reduce((acc, price) => acc + price, 0)
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
            <span className={'text_type_digits-default'}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>

    </>
  )
}
OrdersList.propTypes ={
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  idIngredients: PropTypes.array,
  page: PropTypes.string.isRequired,
}
