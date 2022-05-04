import styles from './register.module.css'
import React, {useState} from 'react';
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';
import { fetchRegister } from "../../services/slice/auth-sclice";
import { Redirect, useLocation } from 'react-router-dom';
import {IInputUserRegister, TLocationState} from "../../services/types/data";
import {useAppDispatch, useAppSelector} from "../../hooks/store";

export const Register = () => {
  const {loggedIn, loggedInErr} = useAppSelector(state => state.auth);
  const location = useLocation<TLocationState>();

  const dispatch = useAppDispatch();
  const [input, setInput] = useState<IInputUserRegister>({
    name: '',
    email: '',
    password: ''
  })

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    dispatch(fetchRegister(input))
  }
  if (loggedIn) {
    return <Redirect
      to={location?.state?.from || '/' }
    />
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
      {loggedInErr &&
        <span className={`${styles.error} text text_type_main-medium mt-2`}>Ошибка!</span>
      }
      <section className={`${styles.options_section} mt-20`}>
        <p className={'text text_type_main-default'}>Уже зарегистрированы?
        <Link
          className={styles.options_link}
          to='/login'> Войти
        </Link>
      </p>
        </section>
    </section>
  );
}


