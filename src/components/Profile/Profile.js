import React, { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './Profile.css';

export function Profile({ handleSignOut, handleUserUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const validate = FormWithValidation();
 
  useEffect(() => {
    validate.setValues(currentUser);
  }, [currentUser]);

  function handleSubmit(e){
    e.preventDefault();
    handleUserUpdate(validate.values);
  }

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <div className='profile__input-list'>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
              <label className='profile__label'>Имя</label>
              <input
                required
                name='name'
                value={validate.values.name || ''}
                className='profile__input'
                placeholder={currentUser.name}
                minLength='2'
                maxLength='30'
                onChange={validate.handleChange}
              />
            </fieldset>
            <span className='profile__error'>{validate.errors.name || ''}</span>
          </div>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
              <input
                required
                name='email'
                value={validate.values.email || ''}
                className='profile__input'
                placeholder={currentUser.email}
                type='email'
                onChange={validate.handleChange}
              >
              </input>
            </fieldset>
            <span className='profile__error'>{validate.errors.email || ''}</span>
          </div>
        </div>
        <button className='profile__submit-button'
          type='submit'
          onClick={handleSubmit}
          disabled={!validate.isValid}>
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
