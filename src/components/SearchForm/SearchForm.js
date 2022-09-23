import { React, useState } from 'react';
import './SearchForm.css';

export function SearchForm ({ onSearch, value }) {
  const [keyword, setKeyword] = useState('');

  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value)
  }

  return(
    <section className='search-form'>
      <form onSubmit={handleSubmit} className='search-form__form'>
        <div className='search-form__bar'>
          <input
            onChange={handleSearch}
            className='search-form__input' 
            placeholder='Фильм'
            type='text'
            value={keyword || ''}
          />
          <button className='search-form__find-button'></button>
        </div>
        <label className='checkbox__label'>
          <input className='checkbox'
            type='checkbox'
            value='short' />
          <span className='checkbox__selector'></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
}
