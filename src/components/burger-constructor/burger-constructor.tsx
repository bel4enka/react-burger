import React, {useState, useContext, useEffect} from "react";
import styles from './burger-constructor.module.css'
import {
  setConstructor,
  setBun,
  fetchOrder
} from "../../services/slice/constructor-slice";
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {
  Button,
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalSum from "../total-sum/total-sum";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { useDrop } from 'react-dnd';
import { nanoid } from 'nanoid'
import BurgerIngredientItem
  from "../burger-ingredient-item/burger-ingredient-item";
import BurgerConstructorItem
  from "../burger-constructor-item/burger-constructor-item";
import {fetchIngredients} from "../../services/slice/ingredients-slice";



const BurgerConstructor = (props) => {
  const dispatch = useDispatch();
  const bun = useSelector((state:RootStateOrAny) => state.constructors.bun);
  const constructor = useSelector((state:RootStateOrAny) => state.constructors.constructor);

  const [modalState, setModalState] = useState({
    'open': false,
    'number': null,
    'name': null
  })

  const toggleModal = (open, num, name) =>{
    setModalState({
      'open': !modalState.open,
      'number': num,
      'name': name
    })
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

  // @ts-ignore
  return (
      <section className={`${styles.cart} mt-25`} ref={drop} style={{border}}>
        {modalState.open &&

          <Modal onClose={toggleModal}>
            <OrderDetails number={modalState.number} name={modalState.name} constructor={constructor}/>
          </Modal>
        }

          <div className={styles.cart__top}>
            {bun.length?
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bun[0].name + ' (верх)'}
                price={bun[0].price}
                thumbnail={bun[0].image}
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
                text={bun[0].name + ' (низ)'}
                price={bun[0].price}
                thumbnail={bun[0].image}
              />: null
            }
          </div>
            {constructor.length &&
              <div className={`${styles.total} mt-10`}>
              {/*<TotalSum/>*/}
              <Button type="primary" size="medium" onClick={() => {
                sendOrder()
              }}>
              <span className="text text_type_main-default disabled">Оформить заказ</span>
              </Button>
              </div>
            }
      </section>
    )
}
export default BurgerConstructor;
