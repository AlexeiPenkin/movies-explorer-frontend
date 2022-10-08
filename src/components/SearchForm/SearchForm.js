import { React, useState } from 'react';
import './SearchForm.css';

export function SearchForm ({ onSearch, filter, durationSwitch }) {
  const [keyword, setKeyword] = useState('');

  const localChecked = localStorage.getItem('saveCheck')
  const [checked, setChecked] = useState(localChecked ?? '0')

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
          <button className={`checkbox__selector checkbox__selector${checked === '1' ? '_on' : '_off'}`}
            type='button'
            onClick={() => {
              setChecked(checked === '0' ? '1' : '0')
              durationSwitch(checked)
            }}
          />
          Короткометражки
      </label>

      </form>
    </section>
  );

}
