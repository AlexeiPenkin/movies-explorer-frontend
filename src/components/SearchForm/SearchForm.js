import { React, useState } from 'react';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';
 
export function SearchForm({ 
  searchValue,
  searchInputOnChangeCB,
  shortValue,
  shortInputOnChangeCB,
  onSubmitCB,
 }) {

  const [checked, setChecked] = useState(shortValue || false);

  const onChangeInputHandler = (e)=>{
    e.preventDefault();
    searchInputOnChangeCB(e.target.value);
  }

  const onChangeCheckboxHandler = (e)=>{
    const isChecked = e.target.checked;
    shortInputOnChangeCB(isChecked);
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    onSubmitCB();
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search" noValidate onSubmit={submitHandler}>
        <div className='search-form__bar'>
          <input
            className="search-form__input"
            name="search"
            type="text"
            placeholder="Фильм"
            value={searchValue}
            onChange={onChangeInputHandler}
            required
          />
          <button className="search-form__find-button" type="submit"></button>
        </div>
        <FilterCheckbox 
          shortMovies={shortValue} 
          handleShortFilms={onChangeCheckboxHandler} 
        />
      </form>
    </section>
  )
}
