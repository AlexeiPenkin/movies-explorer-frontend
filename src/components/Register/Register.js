import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/FormWithValidation';
import './Register.css';

export function Register({ handleRegister }) {
  const validate = useFormWithValidation();
  
  function handleSubmit(e){
    e.preventDefault();
    handleRegister(validate.values);
  }

  return(
    <section className='register'>
      <div className='register__wrapper'>
        <NavLink to='/' className='register__logo'></NavLink>
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>

          <label className='register__label'>Имя</label>
          <input 
            className={`register__input ${validate.errors.name ? 'register__input-error' : ''}`}
            name='name'
            type='text'
            required 
            minLength='2'
            maxLength='30'
            value={validate.values.name || ''}
            onChange={validate.handleChange}
          ></input>
          <span className='register__error'>{validate.errors.name || ''}</span>

          <label className='register__label'>E-mail</label>
          <input 
            className={`register__input ${validate.errors.email ? 'register__input-error' : ''}`}
            name='email'
            type='email'
            required
            value={validate.values.email || ''}
            onChange={validate.handleChange}
          ></input>
          <span className='register__error'>{validate.errors.email || ''}</span>

          <label className='register__label'>Пароль</label>
          <input 
            className={`register__input ${validate.errors.password ? 'register__input-error' : ''}`}
            name='password'
            type='password'
            required 
            minLength='8'
            maxLength='30'
            value={validate.values.password || ''}
            onChange={validate.handleChange}
          ></input>
          <span className='register__error'>{validate.errors.password || ''}</span>

          <button 
            className={`register__button ${
              validate.isValid ? '' : 'register__button_disabled'
            }`}
            disabled={!validate.isValid}
          >Зарегистрироваться</button>

        </form>

        <p className='register__text'>Уже зарегистрированы? <NavLink to='/signin' className='register__link'>Войти</NavLink></p>

      </div>
    </section>
  );
}
