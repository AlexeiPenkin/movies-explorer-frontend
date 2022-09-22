import './MoviesCardAdd.css';

export const MoviesCardAdd = ({ addMovies }) => {
  return (
    <div className='movies-card-add'>
      <button onClick={() => addMovies()} className="movies-card-add__button">Еще</button>
    </div>
  )
};
