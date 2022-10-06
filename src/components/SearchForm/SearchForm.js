import { React, useState } from 'react';
import './SearchForm.css';

export function SearchForm ({ onSearch, handleFilter, filter }) {
  const [keyword, setKeyword] = useState('');

  function handleSearch(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch(keyword, filter)
  }

  // const localValueStorage = localStorage.getItem('saveSearchValue')
  // const localChecked = localStorage.getItem('saveChecked')
  // const location = useLocation()
  // const [checked, setChecked] = useState(localChecked ?? '0')
  // const [value, setValue] = useState(localValueStorage ?? '')
  
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setChecked('0')
  //   onSearch(value)
  // }
  // // console.log(value);

  // useEffect(() => {
  //   if (location.pathname === '/saved-movies') {
  //     setChecked('0')
  //     onSearch(value)
  //     setValue('')
  //   }
  // }, [location])

  // useEffect(() => {
  //   if (location.pathname === '/movies') {
  //     localStorage.setItem('saveSearchValue', value)
  //     localStorage.setItem('saveChecked', checked)
  //   } 
  //   // console.log(checked, value);
  // }, [value, checked])

  // useEffect(() => {
  //   if (location.pathname === '/saved-movies') {
  //     durationSwitch(checked)
  //   }
  //   if (location.pathname === '/movies') {
  //     onSearch(localValueStorage ?? '')
  //     durationSwitch(checked ?? '0')
  //   }
  // }, [location, checked])

  return(
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit}>
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
          <input className='checkbox'
            type='checkbox'
            value='shortMovies'
            onChange={handleFilter}
            checked={filter}
             />
          <span className='checkbox__selector'></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
}
