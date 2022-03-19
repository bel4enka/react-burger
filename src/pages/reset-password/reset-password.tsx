import styles from '../registr/register.module.css'
import React, {useRef, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import {ForgotPassword} from "../forgot-password/forgot-password";




export const ResetPassword = () => {

  const [input, setInput] = useState({
    password: '',
    code: ''
  })

  const onChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
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
          value={input.code}
          name={'code'}
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


