import { React, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './SearchForm.css';

export function SearchForm ({ onSearch, durationSwitch }) {
  const localValueStorage = localStorage.getItem('saveSearchValues')
  const localChecked = localStorage.getItem('saveChecked')

  const location = useLocation()

  const [checked, setChecked] = useState(localChecked ?? '0')
  const [value, setValue] = useState(localValueStorage ?? '')

  const handleSubmit = (e) => {
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
  // console.log(value);

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('saveSearchValues', value)
      localStorage.setItem('saveChecked', checked)
    }
  }, [value, checked])


  useEffect(() => {
    if (location.pathname === '/saved-movies') {
      durationSwitch(checked)
    }
    if (location.pathname === '/movies') {
      onSearch(localValueStorage ?? '')
      durationSwitch(checked ?? '0')
    }
  }, [location, checked])

  return(
    <section className='search-form'>
      <form onSubmit={handleSubmit} className='search-form__form'>
        <div className='search-form__bar'>
          <input className='search-form__input' 
            type='search'
            name='search'
            onChange={(e) => setValue(e.target.value)}
            placeholder='Фильм'
            required
            value={value}
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
