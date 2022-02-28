import React from "react";
import styles from './ingredient-details.module.css'
import PropTypes from "prop-types";
import burgerIngredients from "../../utils/type";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function IngredientDetails(props) {
  return(
    <>
      <img className={styles.img} src={props.item.image} alt={props.item.name}/>
      <p className={'text text_type_main-medium mt-4 mb-8'}>{props.item.name}</p>
      <div>
        <ul className={styles.info}>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Калории,ккал
            <span className="text text_type_digits-default">{props.item.calories}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Белки, г
            <span className="text text_type_digits-default">{props.item.proteins}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Жиры, г
            <span className="text text_type_digits-default">{props.item.fat}</span>
          </li>
          <li className={`${styles.info__item} text text_type_main-default text_color_inactive`}>Углеводы, г
            <span className="text text_type_digits-default">{props.item.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }),
  item: PropTypes.object.isRequired
}
export default IngredientDetails