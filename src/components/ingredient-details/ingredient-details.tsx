import React from "react";
import styles from './ingredient-details.module.css'

import {RootStateOrAny, useSelector} from "react-redux";

function IngredientDetails() {
  const {ingredient} = useSelector((state:RootStateOrAny) => state.ingredients);

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
