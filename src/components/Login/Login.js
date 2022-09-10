import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../image/logo.svg';
import { useState } from 'react';
import classNames from 'classnames';
import './Login.css';

const type = 'signin';
const title = 'Мы рады,что Вы опять с нами!';
const button = 'Войти';
const text = `Еще не зарегистрированы? `;

export const Login = () => {
  const [messageError, setMessageError] = useState({
    email: '',
    password: '',
  });
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  
  const classErrorName = classNames(`login__input`, {
    error: messageError.name,
  });
  const classErrorEmail = classNames(`login__input`, {
    error: messageError.email,
  });
  const classErrorPassword = classNames(`login__input`, {
    error: messageError.password,
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValue((prev) => ({ ...prev, [name]: value }));
    setMessageError((prev) => ({
      ...prev,
      [name]: evt.target.validationMessage,
    }));
  };

  return (
    <section className='login'>
      <form className='login__form'>

        <NavLink to='/' className='login__link'>
          <img className='login__logo' src={logo} alt='logo' />
        </NavLink>

        <h1 className='login__title'>{title}</h1>

        <div className='login-fieldsets__wrapper'>
          {type === 'signup' && (

            <fieldset className='login__fieldset'>
              <label className='login__label'>Имя</label>
              <input
                className={classErrorName}
                type='text'
                name='name'
                pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
                required
                minLength={2}
                maxLength={100}
                value={value.name}
                onChange={handleInputChange}
              />
              {messageError.name && (
                <span className='login__span-error'>{messageError.name}</span>
              )}
            </fieldset>
          )}

          <fieldset className='login__fieldset'>
            <label className='login__label'>E-mail</label>
            <input
              className={classErrorEmail}
              type='email'
              name='email'
              required
              value={value.email}
              onChange={handleInputChange}
            />
            {messageError.email && (
              <span className='login__span-error'>{messageError.email}</span>
            )}
          </fieldset>

          <fieldset className='login__fieldset'>
            <label className='login__label'>Пароль</label>
            <input
              className={classErrorPassword}
              type='password'
              name='password'
              value={value.password}
              required
              minLength={8}
              onChange={handleInputChange}
            />
            {messageError.password && (
              <span className='login__span-error'>{messageError.password}</span>
            )}
          </fieldset>

        </div>

        <button type='submit' className='login__button'>{button}</button>
        <p className='login__text'>
          {text}
          {type === 'signup' ? (
            <NavLink className='login-link__text' to='/signin'>
              Войти
            </NavLink>
          ) : (
            <NavLink className='login-link__text' to='/signup'>
              Регистрация
            </NavLink>

          )}
        </p>

      </form>
      
    </section>
  );
};
