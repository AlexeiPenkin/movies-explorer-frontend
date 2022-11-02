import { React, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterCheckbox } from '../FilterCheckbox/FilterCheckbox';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormWithValidation } from '../../utils/FormWithValidation';
import './SearchForm.css';
 
export function SearchForm({ onSearch, handleShortFilms, shortMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = FormWithValidation();
  const [inputError, setInputError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? onSearch(values.search) : setInputError('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setInputError('')
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <section className="search-form">
      <form className="search-form__form" name="search" noValidate onSubmit={handleSubmit}>
        <div className='search-form__bar'>
          <input
            className="search-form__input"
            name="search"
            type="text"
            placeholder="Фильм"
            value={values.search || ''}
            onChange={handleChange}
            required
          />
          <button className="search-form__find-button" type="submit"></button>
        </div>
        <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms} />
      </form>
      <span className="search-form__error">{inputError}</span>
    </section>
  )
}
