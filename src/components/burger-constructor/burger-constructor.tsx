import React, {useState} from "react";
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

const BurgerConstructor = (props) => {

  const [isOpen, setIsOpen] = useState(false)

  function toggleModal() {
    setIsOpen(!isOpen)
  }
  if(props.constr === null) {
    return (<>Загрузка...</>)
  }
  else {
    return (
      <section className={`${styles.cart} mt-25`}>
        {isOpen &&

          <Modal onClose={toggleModal}>
            <OrderDetails/>
          </Modal>
        }
        {/*{props.constr === []?<p>Загрузка...</p>:}*/}

        <div className={styles.cart__top}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={props.constr[0].name + ' (верх)'}
            price={props.constr[0].price}
            thumbnail={props.constr[0].image}
          />
        </div>
        <ul className={`${styles.carts__items} custom-scroll mt-4 mb-4`}>
          {props.constr.map((item, i) => i > 0 && i < props.constr.length - 1 && (
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
        </ul>
        <div className={styles.cart__bottom}>

          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={props.constr[1].name + ' (низ)'}
            price={props.constr[1].price}
            thumbnail={props.constr[1].image}
          />
        </div>
        <div className={`${styles.total} mt-10`}>
          <TotalSum products={props.constr}/>
          <Button type="primary" size="medium" onClick={toggleModal}>
            <span className="text text_type_main-default">Оформить заказ</span>
          </Button>
        </div>
      </section>

    )
  }
}
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(burgerIngredients)
}
export default BurgerConstructor;
