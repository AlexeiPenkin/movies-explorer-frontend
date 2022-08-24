import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../image/logo.svg';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [ inputEmailErrorText, setInputEmailErrorText ] = useState('Вы пропустили это поле.');
  const [ inputPasswordErrorText, setInputPasswordErrorText ] = useState('Вы пропустили это поле.');
  const [ inputEmailValid, setInputEmailValid ] = useState(true);
  const [ inputPasswordValid, setInputPasswordValid ] = useState(true);
  const [ formValid, setFormValid ] = useState(false);

  const submitButtonClassName = `register__button ${formValid ? '' : 'register__submit_disabled'}`;
  const inputEmailClassName = `register__input register__input_type_email ${inputEmailValid ? '' : 'register__input_type_error'}`;
  const inputEmailErrorClassName = `register__input-error ${inputEmailValid ? '' : 'register__input-error_visible'}`;
  const inputPasswordClassName = `register__input register__input_type_password ${inputPasswordValid ? '' : 'register__input_type_error'}`;
  const inputPasswordErrorClassName = `register__input-error ${inputPasswordValid ? '' : 'register__input-error_visible'}`;

  // const handleInputChange = (evt) => {
  //   const { name, value } = evt.target;
  //   setValue((prev) => ({ ...prev, [name]: value }));
  //   setMessageError((prev) => ({
  //     ...prev,
  //     [name]: evt.target.validationMessage,
  //   }));
  // };

  function handleNameChange(e) {
    setEmail(e.target.value);
    setInputEmailValid(e.target.validity.valid);
    setInputEmailErrorText(e.target.validationMessage);
    if (e.target.validity.valid && inputPasswordValid && password !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setInputEmailValid(e.target.validity.valid);
    setInputEmailErrorText(e.target.validationMessage);
    if (e.target.validity.valid && inputPasswordValid && password !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setInputPasswordValid(e.target.validity.valid);
    setInputPasswordErrorText(e.target.validationMessage);
    if (e.target.validity.valid && inputEmailValid && email !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  useEffect(() => {
    setFormValid(false);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    Register({email, password});
    // if (props.regStatus) {
    //   setEmail('');
    //   setPassword('');
    // }
  }

  return (
    <section className='register'>
      <form className='register__form'>

        <Link to='/' className='register__link'>
          <img className='register__logo' src={logo} alt='logo' />
        </Link>

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
                onChange={handleNameChange}
              />
              {messageError.name && (
                <span className='register__span-error'>{inputEmailErrorText}</span>
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
              onChange={handleEmailChange}
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
              onChange={handlePasswordChange}
            />
            {messageError.password && (
              <span className='register__span-error'>{inputPasswordErrorText}</span>
            )}
          </fieldset>

        </div>

        <button className={submitButtonClassName} type="submit" disabled={formValid ? false : true}></button>

        <p className='register__text'>
          {text}
          {type === 'signup' ? (

            <Link className='register-link__text' to='/signin'>
              Войти
            </Link>

          ) : (
            
            <Link className='register-link__text' to='/signup'>
              Регистрация
            </Link>

          )}
        </p>

      </form>
      
    </section>
  );
};
