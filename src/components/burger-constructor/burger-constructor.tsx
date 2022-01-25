import React from "react";
import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import TotalSum from "../total-sum/total-sum";

const BurgerConstructor = (props) => {
  return (
    <section className={`${styles.cart} mt-25`}>
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
          text={props.constr[props.constr.length - 1].name + ' (низ)'}
          price={props.constr[props.constr.length - 1].price}
          thumbnail={props.constr[props.constr.length - 1].image}
        />
      </div>
      <TotalSum products={props.constr}/>
    </section>
  )
}
export default BurgerConstructor;
