import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';

export const IngredientsPage = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Детали ингредиента</h2>
        <IngredientDetails />
      </div>
    </div>
  )
}
