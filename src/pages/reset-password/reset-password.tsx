import styles from '../registr/register.module.css'
import React, {useRef, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {fetchUpdatePassword} from "../../services/slice/auth-sclice";




export const ResetPassword = () => {

  const {loggedIn, forgotPasswordOk, resetPasswordOk} = useSelector((state:RootStateOrAny) => state.auth);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    password: '',
    token: ''
  })

  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // @ts-ignore
    dispatch(fetchUpdatePassword(input))
  }

  if(loggedIn) {
    return <Redirect to={'/'} />
  }

  if(!forgotPasswordOk) {
    return <Redirect to={'/login'} />
  }
  if(resetPasswordOk) {
    return <Redirect to={'/login'} />
  }

  return (
    <section className={styles.form_section}>
      <form className={`${styles.form} input_size_default`} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>

        <PasswordInput
          onChange={onChange}
          name={'password'}
          value={input.password}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={input.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <div>
          <Button type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>
      <section className={`${styles.options_section} mt-20`}>
        <p className={'text text_type_main-default mb-4'}>Вспомнили пароль?
          <Link
            className={styles.options_link}
            to='/login'> Войти
          </Link>
        </p>
      </section>
    </section>  );
}


