import React from 'react';
import './Popup.css';

export function Popup({message, onSubmit}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return(
    <div 
      className={`popup ${message && 'popup_opened'}`}
    >
      <form 
        className='popup__container'
        onSubmit={handleSubmit}
      >
        <p className='popup__text'>{message}</p>
        <button 
          type='submit'
          className='popup__submit'
        >
          Хорошо
        </button>
      </form>
    </div>
  );
}
