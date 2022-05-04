import React from 'react';
import { useRef, useState, useEffect } from 'react';
import styles from './profile.module.css'
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  fetchUpdateProfile,
  dellProfileSuccess,
  fetchUpdateToken, setProfileErr
} from "../../services/slice/auth-sclice";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {useAppDispatch, useAppSelector} from "../../hooks/store";
import {IInputUserRegister} from "../../services/types/data";

export const Profile = () => {
  const [input, setInput] = useState<IInputUserRegister>({
    name: '',
    email: '',
    password:''
  })
  const [change, setChange] = useState(false)

  const {user, loggedIn, updateProfileErr, updateProfileSuccess} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setInput({...input, [e.target.name]: e.target.value})
    setChange(true)
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
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

  useEffect(() => {
    if(updateProfileErr) {
      // Надо продумать логику вызова редьюсеров ниже. Хотелось бы получать ответ, о том, что action.payload или action.error === jwt expired
      //Но как это сделать я не знаю
      dispatch(fetchUpdateToken())
      dispatch(fetchUpdateProfile(input))
    }
  }, [updateProfileErr])

  useEffect(() => {
    if(updateProfileErr) {
      setState(true)
    }
    else if(updateProfileSuccess) {
      setState(true)
    }
  }, [user])
  //Жалкая попытка очистить от ошибок

  const [state, setState] = useState(false)
   const onFocus = () => {
     dispatch(dellProfileSuccess(false))
   }

   return (
    <div className={styles.wrap}>
      <ProfileMenu/>
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
