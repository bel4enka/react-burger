import React from "react";
import styles from './app-header.module.css'
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from 'react-router-dom';

function AppHeader() {

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header__wrap}>
        <nav >
          <ul className={styles.nav}>

            <li>
              <NavLink to="/" exact={true} className={`${styles.nav__link} text text_color_inactive`} activeClassName={styles.nav__link_type_active}>
                <BurgerIcon type="primary" />
                <span className="ml-2">Конструктор</span>
              </NavLink>
            </li>

            <li>
              <NavLink exact={true} className={`${styles.nav__link} text text_color_inactive text_type_main-default`} activeClassName={styles.nav__link_type_active} to="/test" >
                <ListIcon type="secondary" />
                <span className={`text text_type_main-default ml-2`}>Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <NavLink to="/" exact={true}> <Logo/> </NavLink>

        <div>
          <NavLink
            exact={true}
            to="/profile"
            activeClassName={styles.profile__link_type_active}
            className={`${styles.profile__link} text text_color_inactive text_type_main-default`}
            >
            <ProfileIcon type="secondary" />
            <span className={` ml-2`}>
              Личный кабинет
            </span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
