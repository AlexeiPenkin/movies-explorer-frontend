import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './SearchForm.css';

export function SearchForm ({ onSearch, onSearchSaved, durationSwitch, savedDurationSwitch }) {
  const localValueStorage = localStorage.getItem('saveSearchValue')
  const localChecked = localStorage.getItem('saveChecked')
  const location = useLocation()
  const [checked, setChecked] = useState(localChecked ?? '0')
  const [value, setValue] = useState(localValueStorage ?? '')
  
  const handleSubmit = (e) => {
    // console.log(e, value);
    e.preventDefault()
    setChecked('0')
    onSearch(value)
  }
  // console.log(value);

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      setChecked('0')
      onSearch(value)
      setValue('')
    }
  }, [location])

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValue', value)
      localStorage.setItem('saveChecked', checked)
    } 
    // console.log(checked, value);
  }, [value, checked])

  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      savedDurationSwitch(checked)
    }
    if (location.pathname === '/movies') {
      onSearch(localValueStorage ?? '')
      durationSwitch(checked ?? '0')
    }
  }, [location, checked])

  return(
    <section className='search-form'>
      <form className='search-form__form' onSubmit={(e) => handleSubmit(e)}>
        <div className='search-form__bar'>
          <input className='search-form__input' id='search'
            type='search'
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
          <input className='checkbox'
            type='checkbox'
            value='shortMovies' />
          <span className='checkbox__selector'></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
}
