import React from "react";
import ReactDOM from 'react-dom';
import styles from './burger-ingredients.module.css'
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientItem
  from "../burger-ingredient-item/burger-ingredient-item";
import PropTypes from 'prop-types';


function BurgerIngredients ({...props}) {
  const [current, setCurrent] = React.useState('bun')

  if (current === 'bun') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  else if (current === 'main') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  else if (current === 'sauce') {
    document.getElementById(current)?.scrollIntoView({
      behavior: 'smooth',
    });
  }

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

            <section id={'bun'}>
              <h2 className={'text text_type_main-medium'}>Булки</h2>
              <ul className={styles.product__items_list}>
                {props.ingredients.map((item) => item.type === 'bun' && <li key={item._id}>
                  <BurgerIngredientItem item={item} />
                </li>)}
              </ul>
            </section>

            <section id={'main'}>
              <h2 className={'text text_type_main-medium mt-10'}>Соусы</h2>
              <ul className={styles.product__items_list}>
                {props.ingredients.map((item) => item.type === 'main' && <li key={item._id}>
                  <BurgerIngredientItem item={item} />
                </li>)}
              </ul>
            </section>

            <section id={'sauce'}>
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number,
  })).isRequired,
}

export default BurgerIngredients
