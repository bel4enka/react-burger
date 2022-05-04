import React, { FC } from 'react';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { useParams } from "react-router-dom";
import {TIngredient} from "../../services/types/data";
import {useAppSelector} from "../../hooks/store";

export const IngredientsPage:FC = () => {

  const { id } = useParams<{ id: string }>()
  const {ingredients} = useAppSelector(state => state.ingredients);
  const ingredient = ingredients.find(item => item._id === id);

  return (
    <>
      {ingredient &&
        <div className={styles.wrap}>
          <div className={styles.center}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails/>
          </div>
        </div>
      }
    </>
  )
}
