import React from "react";
import styles from './ingredient-details.module.css'
import { useParams } from "react-router-dom";

import {RootStateOrAny, useSelector, useDispatch} from "react-redux";
import {
  fetchIngredients,
  selectAll
} from "../../services/slice/ingredients-slice";

export function IngredientDetails() {
  const dispatch = useDispatch();
  const {id} = useParams();

  let {ingredient} = useSelector((state:RootStateOrAny) => state.ingredients)
  const ingredients = useSelector(selectAll);


  if(ingredient === null) {
    dispatch(fetchIngredients())

    // @ts-ignore
    ingredient = ingredients.find(item => item._id === id)

  }

  return(
    <>
      <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
      <p className={'text text_type_main-medium mt-4 mb-8'}>{ingredient.name}</p>
      <div>
        <ul className={styles.info}>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Калории,ккал
            <span className="text text_type_digits-default">{ingredient.calories}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Белки, г
            <span className="text text_type_digits-default">{ingredient.proteins}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Жиры, г
            <span className="text text_type_digits-default">{ingredient.fat}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Углеводы, г
            <span className="text text_type_digits-default">{ingredient.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails
