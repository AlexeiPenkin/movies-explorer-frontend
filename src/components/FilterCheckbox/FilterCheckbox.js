import './FilterCheckbox.css';

export function FilterCheckbox ({ handleFilter, filter }) {
  return (
    <section className='filterCheckbox'>
      <div className='filterCheckbox__container'>
        <label className='filterCheckbox__label'>
          <input 
            onChange={handleFilter}
            type='checkbox' 
            className='filterCheckbox__input'
            checked={filter}
          />
          <span className='filterCheckbox__switcher'></span>
        </label>
      </div>
      <p className='filterCheckbox__title'>Короткометражки</p>
    </section>
  );
}
