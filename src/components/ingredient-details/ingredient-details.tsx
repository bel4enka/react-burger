import React, {useEffect, useMemo} from "react";
import styles from './ingredient-details.module.css'
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchIngredients,
  selectAll
} from "../../services/slice/ingredients-slice";

export function IngredientDetails() {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectAll);
  const { id } = useParams()

  {/*// @ts-ignore*/}
  const ingredient =  ingredients.find(item => item._id === id);

  return (
    <>
      {ingredient &&
        // @ts-ignore

        <><img className={styles.img} src={ingredient.image_large}
          // @ts-ignore
               alt={ingredient.name}/><p
          // @ts-ignore
          className={'text text_type_main-medium mt-4 mb-8'}>{ingredient.name}</p>
          <div>
            <ul className={styles.info}>
              <li
                className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Калории,ккал
                <span
                  // @ts-ignore
                  className="text text_type_digits-default">{ingredient.calories}</span>
              </li>
              <li
                className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Белки,
                г
                <span
                  // @ts-ignore
                  className="text text_type_digits-default">{ingredient.proteins}</span>
              </li>
              <li
                className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Жиры,
                г
                <span
                  // @ts-ignore

                  className="text text_type_digits-default">{ingredient.fat}</span>
              </li>
              <li
                className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Углеводы,
                г
                <span
                  // @ts-ignore

                  className="text text_type_digits-default">{ingredient.carbohydrates}</span>
              </li>
            </ul>
          </div>
        </>
      }
    </>
  )
}

export default IngredientDetails
