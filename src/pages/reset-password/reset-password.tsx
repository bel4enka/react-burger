import styles from '../registr/register.module.css'
import React, { useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import {fetchUpdatePassword} from "../../services/slice/auth-sclice";
import {useAppDispatch, useAppSelector} from "../../hooks/store";
import {IInputPassword} from "../../services/types/data";

export const ResetPassword = () => {

  const {loggedIn, forgotPasswordOk, resetPasswordOk} = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch()


  const [input, setInput] = useState<IInputPassword>({
    password: '',
    token: ''
  })

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
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
    </section>
  );
}


