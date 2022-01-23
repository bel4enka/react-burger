import React from "react";
import ReactDOM from 'react-dom';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem
  from "../burger-ingredient-item/burger-ingredient-item";


function BurgerIngredients ({...props}) {
  const [current, setCurrent] = React.useState('bun')
  return (
        <section className={styles.ingredient}>
          <h1 className={'text text_type_main-large mb-5 mt-10'}>Соберите бургер</h1>
          <div className={styles.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>

          <div className={`${styles.wrap_product} custom-scroll mt-10`}>

            <section className={styles.product_list}>
              <h2 className={'text text_type_main-medium'}>Булки</h2>
              <ul className={styles.product__items_list}>
                {props.ingredients.map((item) => item.type === 'bun' && <li key={item._id}>
                  <BurgerIngredientItem item={item} />
                </li>)}
              </ul>
            </section>

            <section className={styles.product_list}>
              <h2 className={'text text_type_main-medium mt-10'}>Соусы</h2>
              <ul className={styles.product__items_list}>
                {props.ingredients.map((item) => item.type === 'main' && <li key={item._id}>
                  <BurgerIngredientItem item={item} />
                </li>)}
              </ul>
            </section>

            <section className={styles.product_list}>
              <h2 className={'text text_type_main-medium mt-10'}>Начинки</h2>
              <ul className={styles.product__items_list}>
                {props.ingredients.map((item) => item.type === 'sauce' && <li key={item._id}>
                  <BurgerIngredientItem item={item} />
                </li>)}
              </ul>
            </section>
          </div>

        </section>
      )

}


export default BurgerIngredients
