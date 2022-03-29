import styles from '../registr/register.module.css'
import React, {useRef, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';
import {fetchForgotPassword} from "../../services/slice/auth-sclice";


export const ForgotPassword = () => {

  const dispatch = useDispatch();

  const {forgotPasswordOk, loggedIn} = useSelector((state:RootStateOrAny) => state.auth);

  const [input, setInput] = useState({
    email: ''
  })

  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(fetchForgotPassword(input.email))
  }
  if(forgotPasswordOk) {
    return (
      <Redirect to='/reset-password' />
    )
  }
  if(loggedIn) {
    return <Redirect to={'/'} />
  }
  return (
    <section className={styles.form_section}>
      <form className={`${styles.form} input_size_default`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>

        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          value={input.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div>
          <Button type="primary" size="large">
            Восстановить
          </Button>
        </div>
      </form>
      <section className={`${styles.options_section} mt-20`}>
        <p className={'text text_type_main-default'}>Вспомнили пароль?
          <Link
            className={styles.options_link}
            to='/login'> Войти
          </Link>
        </p>
      </section>
    </section>  );
}

