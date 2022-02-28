import React from "react";
import styles from './order-details.module.css'
import iconOk from '../../images/iconOk.png'

function OrderDetails(props) {
  return(
    <>
      <div className={`text text_type_digits-large`}>{props.number}</div>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <div className={`mt-15 mb-15`}>
        <img src={iconOk} alt="готовим заказ"/>
      </div>
      <p className={`text text_type_main-default`}>Ваш {props.name} начали готовить</p>
      <p className={`mt-2 mb-15 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}
export default OrderDetails