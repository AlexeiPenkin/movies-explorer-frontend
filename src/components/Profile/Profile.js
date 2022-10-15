import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './Profile.css';

export function Profile({ handleSignOut, handleUserUpdate }) {
  const currentUser = useContext(CurrentUserContext);
  const validate = FormWithValidation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [existData, setExistData] = useState(false);
  const [failUpdate, setFailUpdate] = useState(true);
  const [successUpdate, setSuccessUpdate] = useState(false);

  function handleNameChange(e) {
    const name = e.target.value;
    setFailUpdate(name === existData.name && email === existData.email);
    setName(name);
  }

  function handleEmailChange(e) {
    const email = e.target.value;
    setFailUpdate(email === existData.email && name === existData.name);
    setEmail(email);
  }

  useEffect(() => {
    if (currentUser.name) {
      setExistData({name: currentUser.name, email: currentUser.email})
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
    setFailUpdate(true);
  }
  
  useEffect(() => {
    return () => {
      setSuccessUpdate(false)
    }
  }, [])

  return (
    <section className='profile'>
      <form className='profile__form' noValidate>
        <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
        <div className='profile__input-list'>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
              <label className='profile__label'>Имя</label>
              <input className={`profile__input ${validate.errors.name ? 'profile__input-error' : ''}`}
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
            <span className='profile__input-error'>{validate.errors.name || ''}</span>
          </div>
          <div className='profile__input-container'>
            <fieldset className='profile__fieldset'>
            <label className='profile__label'>E-mail</label>
            <input className={`profile__input ${validate.errors.email ? 'profile__input-error' : ''}`}
                required
                name='email'
                type='email'
                value={validate.values.email}
                placeholder={currentUser.email}
                onChange={handleEmailChange}
              >
              </input>
            </fieldset>
            <span className='profile__input-error'>{validate.errors.email || ''}</span>
          </div>
        </div>
        <button className='profile__submit-button'
          type='submit'
          onClick={handleSubmit}
          disabled={failUpdate}>
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

// import React, { useContext, useEffect } from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';
// import { FormWithValidation } from '../../utils/FormWithValidation';
// import './Profile.css';

// export function Profile({ handleSignOut, handleUserUpdate }) {
//   const currentUser = useContext(CurrentUserContext);
//   const validate = FormWithValidation();
 
  // useEffect(() => {
  //   validate.setValues(currentUser);
  //   // console.log(currentUser);
  // }, [currentUser]);
  // // console.log(currentUser);

//   function handleSubmit(e){
//     e.preventDefault();
//     handleUserUpdate(validate.values);
//   }

//   return (
//     <section className='profile'>
//       <form className='profile__form'>
//         <h3 className='profile__title'>Привет, {currentUser.name}!</h3>
//         <div className='profile__input-list'>
//           <div className='profile__input-container'>
//             <fieldset className='profile__fieldset'>
//               <label className='profile__label'>Имя</label>
//               <input
//                 required
//                 name='name'
//                 value={validate.values.name || ''}
//                 className='profile__input'
//                 placeholder={currentUser.name}
//                 minLength='2'
//                 maxLength='30'
//                 onChange={validate.handleChange}
//               />
//             </fieldset>
//             <span className='profile__error'>{validate.errors.name || ''}</span>
//           </div>
//           <div className='profile__input-container'>
//             <fieldset className='profile__fieldset'>
//             <label className='profile__label'>E-mail</label>
//               <input
//                 required
//                 name='email'
//                 value={validate.values.email || ''}
//                 className='profile__input'
//                 placeholder={currentUser.email}
//                 type='email'
//                 onChange={validate.handleChange}
//               >
//               </input>
//             </fieldset>
//             <span className='profile__error'>{validate.errors.email || ''}</span>
//           </div>
//         </div>
//         <button className='profile__submit-button'
//           type='submit'
//           onClick={handleSubmit}
//           disabled={!validate.isValid}>
//             Редактировать
//         </button>
//         <button className='profile__signout-button'
//           onClick={handleSignOut}>
//             Выйти из аккаунта
//         </button>
//       </form>
//     </section>
//   );
// };
