import styles from "../orders-list/orders-list.module.css";
import {RootStateOrAny, useSelector} from "react-redux";
import {selectAll} from "../../services/slice/ingredients-slice";

export const ImageListItem = ({id}) => {
  const ingredients = useSelector(selectAll);

// @ts-ignore
  const searchIngredient = ingredients.filter((item) => item._id === id)
  // console.log(searchIngredient[0].image)

  return (
    <li className={styles.images}>
       <img className={styles.img} src={'idImage'} alt={'ингредиент'}/>
    </li>
  )
}
