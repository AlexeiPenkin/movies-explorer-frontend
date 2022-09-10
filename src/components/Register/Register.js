import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../image/logo.svg';
import { useState } from 'react';
import classNames from 'classnames';
import './Register.css';

const type = 'signup';
const title = 'Добро пожаловать!';
const button = 'Зарегистрироваться';
const text = `Уже зарегистрированы? `;

export const Register = () => {
  const [messageError, setMessageError] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
  });
  const classErrorName = classNames(`register__input`, {
    error: messageError.name,
  });
  const classErrorEmail = classNames(`register__input`, {
    error: messageError.email,
  });
  const classErrorPassword = classNames(`register__input`, {
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
    <section className='register'>
      <form className='register__form'>

        <NavLink to='/' className='register__link'>
          <img className='register__logo' src={logo} alt='logo' />
        </NavLink>

        <h1 className='register__title'>{title}</h1>

        <div className='register-fieldsets__wrapper'>
          {type === 'signup' && (

            <fieldset className='register__fieldset'>
              <label className='register__label'>Имя</label>
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
                <span className='register__span-error'>{messageError.name}</span>
              )}
            </fieldset>
          )}

          <fieldset className='register__fieldset'>
            <label className='register__label'>E-mail</label>
            <input
              className={classErrorEmail}
              type='email'
              name='email'
              required
              value={value.email}
              onChange={handleInputChange}
            />
            {messageError.email && (
              <span className='register__span-error'>{messageError.email}</span>
            )}
          </fieldset>

          <fieldset className='register__fieldset'>
            <label className='register__label'>Пароль</label>
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
              <span className='register__span-error'>{messageError.password}</span>
            )}
          </fieldset>

        </div>

        <button type='submit' className='register__button'>{button}</button>

        <p className='register__text'>
          {text}
          {type === 'signup' ? (
            <NavLink className='register-link__text' to='/signin'>
              Войти
            </NavLink>
          ) : (
            <NavLink className='register-link__text' to='/signup'>
              Регистрация
            </NavLink>
          )}
        </p>

      </form>
      
    </section>
  );
};
