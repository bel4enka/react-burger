import styles from "../orders-list/orders-list.module.css";
import {nanoid} from "@reduxjs/toolkit";


export const ImageListItem = ({ingredientsImages}) => {

  // const ingredientsImagesSmall = (ingredientsImages) => {
  //   if (ingredientsImages.length > 5) {
  //    return  ingredientsImages.slice(0, 5)
  //   }
  //   else {
  //     return ingredientsImages
  //   }
  // }

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
              <span className={`${styles.over} text_type_digits-default`}> +{ingredientsImages.length - 5} </span>
            </li>)
        }
      })}
    </>
  )

}
