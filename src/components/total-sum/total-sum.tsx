import React from "react";
import styles from './total-sum.module.css'
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIconCustom from "../currency-icon-custom/currency-icon-custom";

const TotalSum = ({...props}) => {
  const totalSum = props.products.reduce((acc, item) => acc + item.price, 0)
  return (
    <div className={`${styles.total} mt-10`}>
      <div className={styles.total__sum}>
        <span className="text text_type_digits-medium">{totalSum}</span>
        <CurrencyIconCustom size={'32'} />
      </div>
      <Button type="primary" size="medium">
        <span className="text text_type_main-default">Оформить заказ</span>
      </Button>
    </div>
  )
}

export default TotalSum
