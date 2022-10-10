import { React, useState } from 'react';
import './SearchForm.css';

export function SearchForm ({ onSearch, durationSwitch }) {
  const [keyword, setKeyword] = useState('');
  const localChecked = localStorage.getItem('saveCheck')
  // const [checked, setChecked] = useState(localChecked ?? '0')
  const [filter, setFilter] = useState(localChecked ?? '0');
  
  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(keyword, filter)
  }

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={(e) => handleSubmit(e)}>
        <div className='search-form__bar'>
          <input className='search-form__input' id='search'
            type='search'
            name='search'
            onChange={handleSearch}
            placeholder='Фильм'
            required
            value={keyword || ''}
          />
          <button 
            className='search-form__find-button'
            type='submit'>
          </button>
        </div>
        <label className='checkbox__label'>
          <button className={`checkbox__selector checkbox__selector${filter === '1' ? '_on' : '_off'}`}
            type='button'
            onClick={() => {
              setFilter(filter === '0' ? '1' : '0')
              durationSwitch(filter === '0' ? '1' : '0')
            }}
          />
          Короткометражки
        </label>
      </form>
    </section>
  );

}
