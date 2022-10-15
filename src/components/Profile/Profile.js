import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './Profile.css';

export function Profile({ handleSignOut, handleUserUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const validate = FormWithValidation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [originData, setOriginData] = useState(false);
  const [notSuccesUpdate, setNotSuccesUpdate] = useState(true);
  const [succesUpdate, setSuccesUpdate] = useState(false);

  function handleNameChange(e) {
    const name = e.target.value;
    setNotSuccesUpdate(name === originData.name && email === originData.email);
    setName(name);
  }

  function handleEmailChange(e) {
    const email = e.target.value;
    setNotSuccesUpdate(email === originData.email && name === originData.name);
    setEmail(email);
  }

  useEffect(() => {
    if (currentUser.name) {
      setOriginData({name: currentUser.name, email: currentUser.email})
    }
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    handleUserUpdate({
      name: name,
      email: email,
    });
    setNotSuccesUpdate(true);
  }
  
  useEffect(() => {
    return () => {
      setSuccesUpdate(false)
    }
  }, [])

  return (
    <section className='profile'>
      <form className='profile__form'>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <div className='profile__input-list'>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
              <label className='profile__label'>Имя</label>
              <input className={`profile__input ${validate.errors.name ? 'profile__error' : ''}`}
                required
                name='name'
                type='text'
                value={validate.values.name}
                placeholder={currentUser.name}
                minLength='2'
                maxLength='30'
                onChange={handleNameChange}
              />
            </fieldset>
            <span className='profile__error'>{validate.errors.name || ''}</span>
          </div>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
            <input className={`profile__input ${validate.errors.email ? 'profile__error' : ''}`}
                required
                name='email'
                type='email'
                value={validate.values.email}
                placeholder={currentUser.email}
                onChange={handleEmailChange}
              >
              </input>
            </fieldset>
            <span className='profile__error'>{validate.errors.email || ''}</span>
          </div>
        </div>
        <button className='profile__submit-button'
          type='submit'
          onClick={handleSubmit}
          disabled={notSuccesUpdate}>
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
