import React from 'react';
import classNames from 'classnames';
import './InfoToolTip.css';

export const InfoToolTip = ({ isOpen, onClose, messageAcceptAuth }) => {
  const classPopup = classNames(`popup`, {
    popup_opened: isOpen,
  });

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classPopup} onMouseDown={handleMouseDown}>
      <div className='popup__container'>
        <div className='popup__form'>
          <h1 className='info__message'>{messageAcceptAuth}</h1>
        </div>
        <button
          aria-label='Close'
          className='popup__close'
          type='button'
          onClick={() => onClose(false)}
        ></button>
      </div>
    </div>
  );
};
