import React, {FC} from 'react';
import styles from "../ingredient/ingredient.module.css";
import { Link } from 'react-router-dom'
import notFound from './404-error.png'

export const NotFound404:FC = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.center}>
        <h2 className={`${styles.title} text text_type_main-large`}>Страница не найдена!</h2>
        <img src={notFound} alt={'404'}/>
        <Link to="/" className={`${styles.link} text_type_main-default`}>На главную</Link>
      </div>
    </div>
  )
}



