import { Link } from 'react-router-dom';
import logo from '../../image/logo.svg';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import './Login.css';

export const Login = (formAccept, onClick, messageAcceptError) => {
  const type = 'signin';
  const title = 'Мы рады,что Вы опять с нами!';
  const button = 'Войти';
  const text = `Еще не зарегистрированы? `;
  
  const [messageError, setMessageError] = useState({
    email: '',
    password: '',
  });
  const [userData, setValue] = useState({
    email: '',
    password: '',
  });

  const [formValid, setFormValid] = useState(false);
  
  const classErrorName = classNames(`login__input`, { error: messageError.name });
  const classErrorEmail = classNames(`login__input`, { error: messageError.email });
  const classErrorPassword = classNames(`login__input`, { error: messageError.password });

  const submitButtonClassName = classNames(`login__button`, {
    form__button_disable: !formValid,
    'login__button_disable login__button_span-text': !formAccept,
  })

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValue((prev) => ({ ...prev, [name]: value }));
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
    <section className='login'>
      <form className='login__form'>

        <Link to='/' className='login__link'>
          <img className='login__logo' src={logo} alt='logo' />
        </Link>

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
                maxLength={40}
                value={userData.name}
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
              value={userData.email}
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
              value={userData.password}
              required
              minLength={8}
              onChange={handleInputChange}
            />
            {messageError.password && (
              <span className='login__span-error'>{messageError.password}</span>
            )}
          </fieldset>

        </div>

        {!formAccept && <span className='login__error'>{messageAcceptError}</span>}

        <button
          type='submit'
          className={submitButtonClassName}
          onClick={handleRegistration}
          disabled={!formValid}
          >{button}
        </button>

        <p className='login__text'>
          {text}
          {type === 'signup' ? (

            <Link className='login-link__text' to='/signin'>
              Войти
            </Link>

          ) : (
            
            <Link className='login-link__text' to='/signup'>
              Регистрация
            </Link>

          )}
        </p>

      </form>
      
    </section>
  );
};
