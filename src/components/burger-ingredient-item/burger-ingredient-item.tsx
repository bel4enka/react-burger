import React, {FC} from "react";
import styles from './burger-ingredient-item.module.css'
import {
  Counter,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from 'react-router-dom';
import {TIngredient} from "../../services/types/data";
import {useAppSelector} from "../../hooks/store";
import {TLocationState} from "../../services/types/data";

type TIngredientProps = {
  readonly item: TIngredient;
}

const BurgerIngredientItem: FC<TIngredientProps> = ({item}) => {

  const constructors = useAppSelector(state => state.constructors);
  const countBunConstructor = constructors.bun.filter((i) => i._id === item._id).length
  const countIngredientConstructor = constructors.constructor.filter((i) => i._id === item._id).length
  const location = useLocation<TLocationState>();
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
    <Link ref={dragRef} className={styles.product__link} to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }}>
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

export default BurgerIngredientItem
