import React from "react";
import iconOk from '../../images/iconOk.png'
import {RootStateOrAny, useSelector} from "react-redux";

function OrderDetails() {
  const {order} = useSelector((state:RootStateOrAny) => state.constructors);
  return(
    <>
      <div className={`text text_type_digits-large`}>{order.order.number}</div>
      <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
      <div className={`mt-15 mb-15`}>
        <img src={iconOk} alt="готовим заказ"/>
      </div>
      <p className={`text text_type_main-default`}>Ваш {order.name} начали готовить</p>
      <p className={`mt-2 mb-15 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}
export default OrderDetails
