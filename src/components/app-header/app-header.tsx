import React from "react";
import styles from './app-header.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";



function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header__wrap}>
        <nav className={styles.header__nav}>
          <ul className={styles.nav}>

            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="#">
                <BurgerIcon type="primary" />
                <span className={`${styles.nav__title} ml-2 text text_type_main-default`}>Конструктор</span>
              </a>
            </li>

            <li className={styles.nav__item}>
              <a className={styles.nav__link} href="#">
                <ListIcon type="secondary" />
                <span className={`${styles.nav__title} text text_type_main-default text_color_inactive ml-2`}>Лента заказов</span>
              </a>
            </li>
          </ul>
        </nav>

        <a className={styles.logo} href={'#'}> <Logo/> </a>

        <div className={styles.profile}>
          <a className={styles.profile__link} href="#">
            <ProfileIcon type="secondary" />
            <span className={`${styles.profile__title} text text_type_main-default text_color_inactive ml-2`}>
              Личный кабинет
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
