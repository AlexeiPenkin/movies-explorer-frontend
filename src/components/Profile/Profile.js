import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/FormWithValidation';
import './Profile.css';

export function Profile({ hadleSignOut, handleUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const validate = useFormWithValidation();

  React.useEffect(() => {
    validate.setValues(currentUser);
  }, [currentUser]);

  function hadleSubmit(e){
    e.preventDefault();
    handleUpdate(validate.values);
  }

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <div className='profile__input-list'>
          <div className='profile__input-area'>
            <div className='profile__input-container'>
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
            </div>
            <span className='profile__error'>{validate.errors.name || ''}</span>
          </div>
          <div className='profile__input-area'>
            <div className='profile__input-container'>
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
            </div>
            <span className='profile__error'>{validate.errors.email || ''}</span>
          </div>
        </div>
        <button type='submit' className='profile__submit-btn' onClick={hadleSubmit} disabled={!validate.isValid}>Редактировать</button>
        <button className='profile__exit-btn' onClick={hadleSignOut}>Выйти из аккаунта</button>
      </form>
    </section>
  );
};
