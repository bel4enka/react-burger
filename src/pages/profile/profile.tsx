import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import {useSelector, useDispatch, RootStateOrAny} from 'react-redux';
import styles from './profile.module.css'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  logOut, fetchUpdateProfile, dellProfileErr, dellProfileSuccess
} from "../../services/slice/auth-sclice";

export const Profile = () => {


  const [input, setInput] = useState({
    name: '',
    email: '',
    password:''
  })
  const [change, setChange] = useState(false)

  const {user, loggedIn, updateProfileErr, updateProfileSuccess} = useSelector((state:RootStateOrAny) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
    setChange(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(fetchUpdateProfile(input))
  }
  useEffect(() => {
    if(loggedIn) {
      setInput({
        name: user.name,
        email: user.email,
        password: ''
      })
    }
  }, [user])

  const handleLogOut = () => {
    dispatch(logOut())
  }

  useEffect(() => {
    if(updateProfileErr) {
      setState(true)
    }
    else if(updateProfileSuccess) {
      setState(true)
    }

  }, [user])

  // useEffect(() => {
  //   if(state) {
  //     dispatch(dellProfileErr(false))
  //     dispatch(dellProfileSuccess(false))
  //   }
  //
  // })
  const [state, setState] = useState(false)
   const onFocus = () => {
     dispatch(dellProfileSuccess(false))
   }

   return (
    <div className={styles.wrap}>
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
      <section className={styles.content}>
        <form className={`${styles.form} input_size_default`} onSubmit={handleSubmit}>
            <Input
              name={'name'}
              placeholder={'Имя'}
              size={'default'}
              value={input.name}
              icon={'EditIcon'}
              onChange={onChange}
              onFocus={onFocus}
            />
            <Input
              name={'email'}
              type={'email'}
              placeholder={'E-mail'}
              size={'default'}
              error={input.email === ''}
              errorText={'Поле не может быть пустым'}
              value={input.email}
              icon={'EditIcon'}
              onChange={onChange}
              onFocus={onFocus}
            />

            <Input
              name={'password'}
              placeholder={'Введите новый пароль'}
              size={'default'}
              value={input.password}
              icon={'EditIcon'}
              onChange={onChange}
              onFocus={onFocus}
            />
          {change && input.email &&
            <Button type="primary" size="medium" >
              Сохранить
            </Button>
          }
          {updateProfileErr &&
            <span className={`${styles.error} text text_type_main-medium mt-2`}>Ошибка!</span>
          }
          {updateProfileSuccess &&
            <span className={`text text_type_main-medium mt-2`}>Данные профиля изменены</span>
          }
        </form>
      </section>
    </div>
  );
}



