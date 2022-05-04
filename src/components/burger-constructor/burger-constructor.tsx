import React, {FC} from "react";
import styles from './burger-constructor.module.css'
import {
  setConstructor,
  setBun,
  fetchOrder, removeOrderModal
} from "../../services/slice/constructor-slice";
import { Button, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalSum from "../total-sum/total-sum";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem
  from "../burger-constructor-item/burger-constructor-item";
import {useAppDispatch, useAppSelector} from "../../hooks/store";
import {TIngredient, TLocationState} from "../../services/types/data";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const {bun, constructor, order, loading} = useAppSelector(state => state.constructors);
  const {loggedIn} = useAppSelector(state => state.auth);
  const history = useHistory<TLocationState>();

  const toggleModal = () =>{
    dispatch(removeOrderModal(null))
  }
  const sendOrder = () => {
    if(!loggedIn) {
      history.replace({ pathname: '/login' });
      return;
    }
    else {
      const ingredients = bun.concat(constructor)
      dispatch(fetchOrder(ingredients))
    }
  }

  const [{isHover}, drop] = useDrop({
    accept: 'ingredients',
    drop: (item: TIngredient) => {
      onDrop(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
  });
  const border = isHover ? '1px lightgreen solid' : 'none';
  const onDrop = (item:TIngredient) => {
    item.type === 'bun' ? dispatch(setBun(item)) : dispatch(setConstructor(item))
  }

  return (
      <section className={`${styles.cart} mt-25`} ref={drop} style={{border}}>
        {order &&

          <Modal onClose={toggleModal}>
            <OrderDetails/>
          </Modal>
        }

          <div className={styles.cart__top}>
            { bun.length>0 ?
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun[0].name + ' (верх)'}
                price={bun[0].price}
                thumbnail={bun[0].image}
              />: null
            }
          </div>
            {constructor.length>0 || bun.length>0 ?
              <ul className={`${styles.carts__items} custom-scroll mt-4 mb-4`}>

                {constructor.map((item, index) => item.type !== 'bun' && (
                      <BurgerConstructorItem key={item.id} item={item} isLocked={false} index={index} />
                  )
                )}
              </ul>:
              <p className={'mt-30 text text_type_main-default '}>Чтобы сделать заказ, перетащите ингредиенты слева. </p>
            }
          <div className={styles.cart__bottom}>

            {bun.length>0?
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun[0].name + ' (низ)'}
                price={bun[0].price}
                thumbnail={bun[0].image}
              />: null
            }
          </div>

              <div className={`${styles.total} mt-10`}>
              <TotalSum/>
              <Button
                type="primary" size="medium"
                onClick={() => {sendOrder()}}
                disabled={(bun.length === 0 || !constructor)}
              >
              <span className="text text_type_main-default disabled">{loading?'Заказ оформляется... подождите':'Оформить заказ'}</span>
              </Button>
              </div>

      </section>
    )
}
export default BurgerConstructor;
