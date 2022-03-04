import React from "react";
import styles from './total-sum.module.css'
import CurrencyIconCustom from "../currency-icon-custom/currency-icon-custom";
import { useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";

const TotalSum = () => {

  const sumSelector = createSelector(
    //не уверена, что это нужно помещать в createSelector
    [state => state.constructors.bun, state => state.constructors.constructor],
    (bun, constructor) => {
      const totalIngredients = constructor.reduce((acc, item) => acc + item.price, 0)
      const totalBuns = bun[0] ? bun[0].price * 2 : 0;
      return  totalIngredients ? totalIngredients + totalBuns : totalBuns
    }
  )
  const sum = useSelector(sumSelector)

  return (
    <>
      <div className={styles.total__sum}>
        <span className="text text_type_digits-medium">{sum}</span>
        <CurrencyIconCustom size={'32'} />
      </div>
    </>
  )
}

export default TotalSum
