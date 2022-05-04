import styles from "../../pages/profile/profile.module.css";
import React, {FC} from "react";
import { NavLink } from "react-router-dom";
import {logOut} from "../../services/slice/auth-sclice";
import {useAppDispatch} from "../../hooks/store";

export const ProfileMenu:FC = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <section className={styles.menu}>
      <ul className={styles.nav}>
        <li className={'mb-10'}>
          <NavLink
            to="/profile" exact={true}
            className={`${styles.nav__link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles.nav__link_type_active}>
            Профиль
          </NavLink>
        </li>

        <li className={'mb-10'}>
          <NavLink
            exact={true}
            className={`${styles.nav__link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles.nav__link_type_active}
            to="/profile/orders" >
            История заказов
          </NavLink>
        </li>

        <li className={'mb-10'}>
          <NavLink
            exact={true}
            className={`${styles.nav__link} text text_type_main-medium text_color_inactive`}
            activeClassName={styles.nav__link_type_active}
            to="/login"
            onClick={handleLogOut}
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <span className={'text text_type_main-default text_color_inactive'}>
          В этом разделе вы можете
  изменить свои персональные данные</span>
    </section>
  )
}
