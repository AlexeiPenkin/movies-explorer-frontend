import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './Profile.css';

export function Profile({ handleSignOut, handleUserUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const { resetForm, isValid, errors, values, handleChange} = FormWithValidation();
  
  function handleSubmit(e) {
    e.preventDefault();
    handleUserUpdate(values);
    console.log(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const checkInputValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <section className='profile'>
      <form className='profile__form' noValidate onSubmit={handleSubmit}>
        <h3 className='profile__title'>{`Привет, ${currentUser.name || ''}!`}</h3>
        <div className='profile__input-list'>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
              <label className='profile__label'>Имя</label>
              <input className={`profile__input ${errors.name && 'profile__input_error'}`}
                required
                name='name'
                type='text'
                value={values.name || ''}
                placeholder={values.name}
                minLength='2'
                maxLength='30'
                onChange={handleChange}
              />
            </fieldset>
            <span className='profile__input-error'>{errors.name || ''}</span>
          </div>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
            <input className={`profile__input ${errors.email && 'profile__input_error'}`}
                required
                name='email'
                type='email'
                value={values.email || ''}
                placeholder={values.email}
                onChange={handleChange}
              >
              </input>
            </fieldset> 
            <span className='profile__input-error'>{errors.email || ''}</span>
          </div>
        </div>
        <button className={`profile__submit-button ${checkInputValidity ? 'profile__submit-button_disabled' : ''}`}
          type='submit'
          disabled={checkInputValidity ? true : false}>
            Редактировать
        </button>
        <button className='profile__signout-button'
          onClick={handleSignOut}>
            Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};
