import styles from '../registr/register.module.css'
import React, {FC, useState} from 'react';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from 'react-router-dom';
import {fetchForgotPassword} from "../../services/slice/auth-sclice";
import {IInputForgotPassword} from "../../services/types/data";
import {useAppDispatch, useAppSelector} from "../../hooks/store";


export const ForgotPassword: FC = () => {

  const dispatch = useAppDispatch();

  const {forgotPasswordOk, loggedIn} = useAppSelector(state => state.auth);

  const [input, setInput] = useState<IInputForgotPassword>({
    email: ''
  })

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    dispatch(fetchForgotPassword(input))
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


