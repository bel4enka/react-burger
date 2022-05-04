import styles from '../registr/register.module.css'
import React, {FC, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import {
  fetchLogin
} from "../../services/slice/auth-sclice";
import { Redirect, useLocation } from 'react-router-dom';
import {IInputLogin, TLocationState} from "../../services/types/data";
import {useAppDispatch, useAppSelector} from "../../hooks/store";

export const Login:FC = () => {
  const dispatch = useAppDispatch();
  const {loggedIn, loggedInErr} = useAppSelector(state => state.auth);
  const location = useLocation<TLocationState>();

  const [input, setInput] = useState<IInputLogin>({
    email: '',
    password: ''
  })

  const onChange = (e: { target: { name: any; value: any; }; }) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    dispatch(fetchLogin(input))
  }
  const refreshToken = localStorage.getItem('refreshToken');

  if (loggedIn) {
    return <Redirect
      to={location?.state?.from || '/' }
    />
  }

  return (
    <section className={styles.form_section}>
      <form className={`${styles.form} input_size_default`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>

        <Input
          type={'email'}
          placeholder={'e-mail'}
          onChange={onChange}
          value={input.email}
          name={'email'}
          error={false}
          size={'default'}
        />
        <PasswordInput
          onChange={onChange}
          name={'password'}
          value={input.password} />
        <div>
          <Button type="primary" size="large" disabled={(input.email === '' && input.password === '')}>
            Войти
          </Button>

        </div>

        {loggedInErr &&
          <span className={`${styles.error} text text_type_main-medium mt-2`}>Ошибка! Проверьте e-mail или пароль</span>
        }
      </form>
      <section className={`${styles.options_section} mt-20`}>
        <p className={'text text_type_main-default mb-4'}>Вы — новый пользователь?
          <Link
            className={styles.options_link}
            to='/register'> Зарегистрироваться
          </Link>
        </p>
        <p className={'text text_type_main-default'}>Забыли пароль?
          <Link
            className={styles.options_link}
            to='/forgot-password'> Восстановить пароль
          </Link>
        </p>
      </section>
    </section>  );
}


