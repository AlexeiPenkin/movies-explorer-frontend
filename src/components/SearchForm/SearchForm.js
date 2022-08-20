import './SearchForm.css';

export const SearchForm = () => {
  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <div className='search-form__movie'>
          <input
            className='search-form__input'
            type='text'
            placeholder={`Фильм`}
            required
          />
        <button className='search-form__button' type='button'></button>
        </div>
      </form>
      <label className='checkbox__label'>
          <input className='checkbox' type='checkbox' value='short' />
          Короткометражки
          <span className='checkbox__pseudo'></span>
        </label>
    </section>
  );
};
