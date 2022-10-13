import { React, useState, useEffect } from 'react';
import { FormWithValidation } from '../../utils/FormWithValidation';
import { useLocation } from "react-router-dom";
import './SearchForm.css';

export function SearchForm ({ onSearch, durationSwitch }) {
  const localStorageValue = localStorage.getItem('saveSearchValue')
  const localChecked = localStorage.getItem('saveCheckbox')
  const location = useLocation()
  const [value, setValue] = useState(localStorageValue ?? '')
  const [filter, setFilter] = useState(localChecked ?? '0');
  const { isValid } = FormWithValidation();
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilter('0')
    onSearch(value)
    isValid ? onSearch(e) : setInputError('Нужно ввести ключевое слово');
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setFilter('0')
      onSearch(value)
      setValue('')
    }
  }, [location])


  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValue', value)
      localStorage.setItem('saveCheckbox', filter)
    }
  }, [value, filter])


  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationSwitch(filter)
    }
    if (location.pathname === '/movies') {
      onSearch(localStorageValue ?? '')
      durationSwitch(filter ?? '0')
    }
  }, [location, filter])

  return (
    <section className='search-form'>
      <form className='search-form__form' noValidate onSubmit={(e) => handleSubmit(e)}>
        <div className='search-form__bar'>
          <input className='search-form__input' id='search'
            type='text'
            name='search'
            onChange={(e) => setValue(e.target.value)}
            placeholder='Фильм'
            required
            value={value}
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
      <span className="search-form__error">{inputError}</span>
    </section>
  );
}
