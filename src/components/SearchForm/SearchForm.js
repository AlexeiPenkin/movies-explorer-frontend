import { React, useState, useEffect, useContext } from 'react';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './SearchForm.css';

export function SearchForm ({ onSearch, durationSwitch }) {
  const [keyword, setKeyword] = useState('');
  const localChecked = localStorage.getItem('saveCheck')
  const [filter, setFilter] = useState(localChecked ?? '0');
  const { values, isValid, setIsValid } = FormWithValidation();
  const [errorQuery, setErrorQuery] = useState('');

  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(keyword, filter)
    isValid ? handleSearch(keyword.search) : setErrorQuery('Нужно ввести ключевое слово.');
  }

  useEffect(() => {
    setErrorQuery('')
  }, [isValid]);

  // useEffect(() => {
  //   if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - searchMovie`)) {
  //     const searchValue = localStorage.getItem(`${currentUser.email} - searchMovie`);
  //     keyword.search = searchValue;
  //     setIsValid(true);
  //   }
  // }, [currentUser]);

  return (
    <section className='search-form'>
      <form className='search-form__form' noValidate onSubmit={handleSubmit}>
        <div className='search-form__bar'>
          <input className='search-form__input' id='search'
            type='text'
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
      <span className="search-form__error">{errorQuery}</span>
    </section>
  );

}
