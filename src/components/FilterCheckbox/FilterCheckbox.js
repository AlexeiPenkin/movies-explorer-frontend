import './FilterCheckbox.css';

export function FilterCheckbox({ shortMovies, handleShortFilms }) {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
      />
      <span className="filter__switcher"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}
