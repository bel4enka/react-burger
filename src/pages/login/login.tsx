import styles from '../registr/register.module.css'
import React, {useRef, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
  RootStateOrAny
} from "react-redux";
import {fetchLogin} from "../../services/slice/auth-sclice";
import { Redirect, useLocation } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const {loggedIn, loggedInErr} = useSelector((state:RootStateOrAny) => state.auth);
  const location = useLocation();

  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(fetchLogin(input))
  }

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


