import styles from "../orders-list/orders-list.module.css";
import {FC} from "react";


export const ImageListItem:FC<{ ingredientsImages: string[] }> = ({ingredientsImages}) => {

  return (
    <>
      {ingredientsImages.slice(0, 6).map((item, i) => {
        if (i < 5) {
          return (
            <li key={i} className={styles.images} >
              <img className={styles.img} src={item} alt={'ингредиент'}/>
            </li>)
        } else {
          return (
            <li key={i} className={`${styles.images} ${styles.last_images}`}>
              <img className={`${styles.img} ${styles.last_img}`} src={item} alt={'ингредиент'}/>
              {ingredientsImages.length - 6 === 0?null:
                <span className={`${styles.over} text_type_digits-default`}>{`+${ingredientsImages.length - 6}`}</span>
              }
            </li>)
        }
      })}
    </>
  )

}
