import styles from './register.module.css'
import React, {useRef, useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';




export const Register = () => {

  const [input, setInput] = useState({
    name: '',
    email: '',
    password: ''
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
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={input.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'e-mail'}
          onChange={onChange}
          value={input.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput onChange={onChange} name={'password'} value={input.password} />
        <div>
          <Button type="primary" size="large">
          Зарегистрироваться
        </Button>
        </div>
      </form>
      <section className={`${styles.options_section} mt-20`}>
        <p className={'text text_type_main-default'}>Уже зарегистрированы?
        <Link
          className={styles.options_link}
          to='/login'> Войти
        </Link>
      </p>
        </section>
    </section>  );
}


