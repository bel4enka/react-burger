import React, {useState, useContext, useEffect} from "react";
import styles from './burger-constructor.module.css'
import {
  Button,
  ConstructorElement,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import TotalSum from "../total-sum/total-sum";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import burgerIngredients from "../../utils/type";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import {Context} from "../../services/context";

const BurgerConstructor = (props) => {

  const {state, dispatch} = useContext(Context)
  const constr = state.constr
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
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredients: constr.map(e => e._id),
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
      .then(res => {
        toggleModal(!modalState.open, res.order.number, res.name);
        dispatch({type:"constr", payload: []})
      })
      .catch(err => {
        console.log(err);
      })
  }

    return (

      <section className={`${styles.cart} mt-25`}>
        {modalState.open &&

          <Modal onClose={toggleModal}>
            <OrderDetails number={modalState.number} name={modalState.name}/>
          </Modal>
        }

          <div className={styles.cart__top}>
            {constr[0] &&
              <ConstructorElement
                type="top"
                isLocked={true}
                text={constr[0].name + ' (верх)'}
                price={constr[0].price}
                thumbnail={constr[0].image}
              />
            }
          </div>
            {constr.length > 0 ?
              <ul className={`${styles.carts__items} custom-scroll mt-4 mb-4`}>

                {constr.map((item, i) => item.type !== 'bun' && (
                    <li className={`${styles.cart__item}`} key={item._id + i}>
                      <DragIcon type="primary"/>
                      <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                      />
                    </li>
                  )
                )}
              </ul>:
              <p className={'mt-30 text text_type_main-default '}>Чтобы сделать заказ, перетащите ингредиенты слева. </p>
            }
          <div className={styles.cart__bottom}>

            {constr[0] &&
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={constr[0].name + ' (низ)'}
                price={constr[0].price}
                thumbnail={constr[0].image}
              />
            }
          </div>
            {constr.length > 0 &&
              <div className={`${styles.total} mt-10`}>
              <TotalSum/>
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
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(burgerIngredients)
}
export default BurgerConstructor;
