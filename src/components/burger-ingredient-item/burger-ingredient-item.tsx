import React from "react";
import styles from './burger-ingredient-item.module.css'
import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import {RootStateOrAny, useSelector} from "react-redux";
import { Link, useLocation } from 'react-router-dom';


function BurgerIngredientItem ({item}) {
  const constructors = useSelector((state:RootStateOrAny) => state.constructors);
  const countBunConstructor = constructors.bun.filter((i) => i._id === item._id).length
  const countIngredientConstructor = constructors.constructor.filter((i) => i._id === item._id).length
  const location = useLocation();
  const {image, price, name } = item;
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  return (
    !isDrag && (
    <Link ref={dragRef} className={styles.product__link} to={{ pathname: `/ingredients/${item._id}`, state: { ingredient: location } }}>
      <img src={image} alt={name}/>
      <div className={styles.product__price}>
        <span className={'text text_type_digits-default'}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.product__title} text text_type_main-default`}>{name}</h3>
      {countIngredientConstructor > 0 && <Counter count={countIngredientConstructor} size='default' />}
      {countBunConstructor> 0 && <Counter count={countBunConstructor} size='default' />}

    </Link>
    )
  )

}
BurgerIngredientItem.propTypes ={
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }),
  handler: PropTypes.any
}

export default BurgerIngredientItem
