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
        <label className='checkbox__label'>
          <input className='checkbox' type='checkbox' value='short' />
          <span className='checkbox__pseudo-element'></span>
          Короткометражки
        </label>
        {/* <div className='search-form__bottom-line'></div> */}
      </form>
    </section>
  );
};
