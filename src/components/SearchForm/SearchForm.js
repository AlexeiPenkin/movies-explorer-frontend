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
  const validate = FormWithValidation();
  const [inputError, setInputError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilter('0')
    onSearch(validate.values.search)
    validate.isValid ? onSearch(validate.values.search) : setInputError('Нужно ввести ключевое слово');
  }

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setFilter('0')
      onSearch(validate.values.search)
      setValue('')
    }
  }, [location])

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValue', validate.value)
      localStorage.setItem('saveCheckbox', filter)
    }
  }, [validate.value, filter])


  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationSwitch(filter)
    }
    if (location.pathname === '/movies') {
      onSearch(validate.values.search ?? '')
      durationSwitch(filter ?? '0')
    }
  }, [location, filter])

  return (
    <section className='search-form'>
      <form className='search-form__form' noValidate onSubmit={(e) => handleSubmit(e)}>
        <div className='search-form__bar'>
          <input className={`search-form__input ${validate.errors.search ? 'search-form__error' : ''}`}
            id='search'
            type='text'
            name='search'
            onChange={validate.handleChange}
            placeholder='Фильм'
            required
            value={validate.values.search}
          />
          <button className='search-form__find-button'
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
