import { MoviesCard } from '../MoviesCard/MoviesCard';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import './MoviesCardList.css';

export function MoviesCardList ({ path, movies, moviesNumber, handleAddMovies, deleteMovie }) {
  const moviesCard = movies
    .filter((card, number) => number < moviesNumber)
    .map((movie) => {
    return (
      <MoviesCard 
        path={path}
        movie={movie}
        savedMovie={SavedMovies}
        deleteMovie={deleteMovie}
        key={movie._id}
      />
    )
  })
  return(
    <section className='cards-list'>
      <div className='cards-list__grid'>
        {moviesCard}
      </div>
      {movies.length > moviesNumber && ( 
        <section className='cards-list__add-movies'>
          <button 
            type='button'
            className='cards-list__add-movies-button'
            onClick={handleAddMovies}>
              Ещё
          </button>
        </section>
      )}
    </section>
  );
}
