import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import {selectAll} from "../../services/slice/ingredients-slice";
export const IngredientsPage = () => {

  const { id } = useParams();
  const ingredients = useSelector(selectAll)

  {/*// @ts-ignore*/}
  const ingredient = ingredients.find(item => item._id === id);

  return (
    <>
      {ingredient &&
        <div className={styles.wrap}>
          {/*// @ts-ignore*/}
          <div className={styles.center}>
            <h2 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h2>
            <IngredientDetails/>
          </div>
        </div>
      }
    </>
  )
}
