import React from "react";
import styles from './burger-ingredient-item.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredientItem ({...props}) {
  return (
    <a className={styles.product__link} href='#'>
      <img src={props.item.image} alt={props.item.name}/>
      <div className={styles.product__price}>
        <span className={'text text_type_digits-default'}>{props.item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.product__title} text text_type_main-default`}>{props.item.name}</h3>
    </a>
  )

}


export default BurgerIngredientItem
