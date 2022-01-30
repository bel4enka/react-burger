import React from "react";
import styles from './ingredient-details.module.css'

function IngredientDetails(props) {
  return(
    <>
      <p className={'text text_type_main-medium mt-4 mb-8'}>Детали ингредиента</p>
      <img src={props.item.image} alt={props.item.name}/>
      <p>{props.item.name}</p>
      <div>
        <ul>
          <li className="text text_type_main-default text_color_inactive">Калории,ккал
            <span className="text text_type_digits-default">{props.item.calories}</span>
          </li>
          <li className="text text_type_main-default text_color_inactive">Белки, г
            <span className="text text_type_digits-default">{props.item.proteins}</span>
          </li>
          <li className="text text_type_main-default text_color_inactive">Жиры, г
            <span className="text text_type_digits-default">{props.item.fat}</span>
          </li>
          <li className="text text_type_main-default text_color_inactive">Углеводы, г
            <span className="text text_type_digits-default">{props.item.carbohydrates}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails
