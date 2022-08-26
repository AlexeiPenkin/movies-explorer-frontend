import { Link } from 'react-router-dom';
import logo from '../../image/logo.svg';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Register.css';

export const Register = (formAccept, onClick, messageAcceptError) => {
  const type = 'signup';
  const title = 'Добро пожаловать!';
  const button = 'Зарегистрироваться';
  const text = `Уже зарегистрированы? `;

  const [messageError, setMessageError] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState(false);

  const classErrorName = classNames(`register__input`, { error: messageError.name });
  const classErrorEmail = classNames(`register__input`, { error: messageError.email });
  const classErrorPassword = classNames(`register__input`, { error: messageError.password });

  const submitButtonClassName = classNames(`register__button`, {
    form__button_disable: !formValid,
    'register__button_disable register__button_span-text': !formAccept,
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setMessageError((prev) => ({
      ...prev,
      [name]: evt.target.validationMessage,
    }));
  };

  const handleRegistration = (e) => {
    if (type === 'signin' && (!userData.password || !userData.email)) {
      return;
    } else if (
      type === 'signup' &&
      (!userData.name || !userData.password || !userData.email)
    ) {
      return;
    } else {
      return onClick(userData);
    }
  };
  
  useEffect(() => {
    if (type === 'signup') {
      if (messageError.name || messageError.email || messageError.password) {
        return setFormValid(false);
      } else if (!userData.name || !userData.password || !userData.email) {
        return setFormValid(false);
      }
    } else if (type === 'signin') {
      if (messageError.email || messageError.password) {
        return setFormValid(false);
      } else if (!userData.password || !userData.email) {
        return setFormValid(false);
      }
    }
    setFormValid(true);
  }, [messageError, userData, type]);

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
                maxLength={40}
                value={userData.name}
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
              value={userData.email}
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
              value={userData.password}
              required
              minLength={8}
              onChange={handleInputChange}
            />
            {messageError.password && (
              <span className='register__span-error'>{messageError.password}</span>
            )}
          </fieldset>

        </div>

        {!formAccept && <span className='register__error'>{messageAcceptError}</span>}

        <button
          type='submit'
          className={submitButtonClassName}
          onClick={handleRegistration}
          disabled={!formValid}
          >{button}
        </button>

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
