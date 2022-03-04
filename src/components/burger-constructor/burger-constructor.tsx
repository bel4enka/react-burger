import React from "react";
import styles from './burger-constructor.module.css'
import {
  setConstructor,
  setBun,
  fetchOrder, removeOrderModal
} from "../../services/slice/constructor-slice";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import { Button, ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalSum from "../total-sum/total-sum";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { useDrop } from 'react-dnd';
import BurgerConstructorItem
  from "../burger-constructor-item/burger-constructor-item";



const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const {bun, constructor, order} = useSelector((state:RootStateOrAny) => state.constructors);

  const toggleModal = () =>{
    dispatch(removeOrderModal(null))
  }
  const sendOrder = () => {
    const ingredients = bun.concat(constructor).map(e => e._id)
    // @ts-ignore
    dispatch(fetchOrder(ingredients))

  }

  const [{isHover}, drop] = useDrop({
    accept: 'ingredients',
    drop: (item) => {
      onDrop(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
  });
  const border = isHover ? '1px lightgreen solid' : 'none';
  const onDrop = (item) => {
    // @ts-ignore
    item.type === 'bun' ? dispatch(setBun(item)) : dispatch(setConstructor(item))
  }
  const bunFirstElement = bun[0];
  // @ts-ignore
  return (
      <section className={`${styles.cart} mt-25`} ref={drop} style={{border}}>
        {order &&

          <Modal onClose={toggleModal}>
            <OrderDetails/>
          </Modal>
        }

          <div className={styles.cart__top}>
            {bun.length?
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bunFirstElement.name + ' (верх)'}
                price={bunFirstElement.price}
                thumbnail={bunFirstElement.image}
              />: null
            }
          </div>
            {constructor.length || bun.length ?
              <ul className={`${styles.carts__items} custom-scroll mt-4 mb-4`}>

                {constructor.map((item, index) => item.type !== 'bun' && (
                  // @ts-ignore
                      <BurgerConstructorItem key={item.id} item={item} isLocked={false} id={item._id} index={index} constructor={constructor}/>
                  )
                )}
              </ul>:
              <p className={'mt-30 text text_type_main-default '}>Чтобы сделать заказ, перетащите ингредиенты слева. </p>
            }
          <div className={styles.cart__bottom}>

            {bun.length?
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bunFirstElement.name + ' (низ)'}
                price={bunFirstElement.price}
                thumbnail={bunFirstElement.image}
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
              <span className="text text_type_main-default disabled">Оформить заказ</span>
              </Button>
              </div>

      </section>
    )
}
export default BurgerConstructor;
