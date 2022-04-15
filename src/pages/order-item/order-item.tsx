import styles from "./order-item.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {selectAll} from "../../services/slice/ingredients-slice";
import {useParams} from "react-router-dom";
import {statusOrder} from "../../utils/utils";
import {useEffect, useMemo} from "react";
import {
  closedWSConnection,
  startWSConnection
} from "../../services/slice/websocket-slice";
import {nanoid} from "@reduxjs/toolkit";



export const OrderItem = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
    dispatch(startWSConnection())
    // @ts-ignore
    return () => {
      dispatch(closedWSConnection());
    };
  }, []);
  const { id } = useParams()

  const {feedsOrders} = useSelector((state:RootStateOrAny) => state.webSocket);

  const orders = (feedsOrders) =>feedsOrders?feedsOrders.filter(item => item._id === id)[0]:null
  const order = orders(feedsOrders)

  function useOrderIngredients(order) {
    const ingredients = useSelector(selectAll);
    const { newIngredients, total } = useMemo(() => {
      if (order) {
        return order.ingredients.reduce((acc, orderIngredient) => {
          const newIngredient = acc.newIngredients.find(item => item.ingredient._id === orderIngredient);
          if (!newIngredient) {
            // @ts-ignore
            const ingredient = ingredients.find((item) => item._id === orderIngredient);
            if (ingredient) {
              acc.newIngredients.push({ ingredient, count: 1 });
              // @ts-ignore
              acc.total += ingredient.price;
            }
          }
          else {
            newIngredient.count += 1;
            acc.total += newIngredient.ingredient.price;
          }

          return acc;
        }, { newIngredients: [], total: 0 })
      }
      else {
        return { newIngredients: [], total: 0 }
      }
    }, [order, ingredients])

    return { newIngredients, total }
  }

  const newIngredient = useOrderIngredients(order)

  return (
  <>
    {order &&

      <div className={styles.wrap}>
        <section className={`${styles.header} mb-15`}>

          <h2
            className={`${styles.header_title} text_type_digits-default mb-10`}>
            #{order.number}</h2>
          <h2 className={'text text_type_main-medium mb-3'}>{order.name}</h2>

          <span className={'text text_type_main-small '}>
            {statusOrder(order.status)}</span>
        </section>

        <section className={styles.body}>
          <h2 className={'text text_type_main-medium mb-6'}>Состав:</h2>
          <ul className={styles.ingredients_list}>
            {newIngredient.newIngredients.map(item =>
                    (<li key={nanoid()} className={styles.ingredient_item}>
                      <img className={styles.ingredient_img} alt={'ингредиент'}
                           src={item.ingredient.image}/>
                        <h3
                        className={`${styles.ingredient_title} text text_type_main-default`}>{item.ingredient.name}</h3>
                      <span className={`${styles.count} text_type_digits-default`}>{item.count} X {item.ingredient.price}
                        <CurrencyIcon type="primary"/>
                      </span>
                    </li>)
                  )
            }
          </ul>
        </section>

        <section className={styles.footer}>
          <time
            // @ts-ignore
            className={`${styles.footer_date} text text_color_inactive text_type_main-default`}>{order.createdAt}
          </time>
          <div className={styles.footer_price}>
            <span className={'text_type_digits-default'}>{newIngredient.total}</span>
            <CurrencyIcon type="primary"/>
          </div>
        </section>

      </div>
       }
    </>
  )
}


