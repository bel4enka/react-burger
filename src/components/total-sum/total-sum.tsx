import React, {useContext} from "react";
import styles from './total-sum.module.css'
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import CurrencyIconCustom from "../currency-icon-custom/currency-icon-custom";
import {Context} from "../../services/context";

const TotalSum = () => {

  const {state} = useContext(Context)

  return (
    <>
      <div className={styles.total__sum}>
        <span className="text text_type_digits-medium">{state.total}</span>
        <CurrencyIconCustom size={'32'} />
      </div>
    </>
  )
}

export default TotalSum
