import { MoviesCard } from '../MoviesCard/MoviesCard';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import './MoviesCardList.css';

export function MoviesCardList ({ path, movies, numberOfMovies, handleMore, saveMovie, deleteMovie, key }) {
  const moviesCard = movies
    .filter((card, number) => number < numberOfMovies)
    .map((movie) => {
    return (
      <MoviesCard 
        path={path}
        movie={movie}
        saveMovie={SavedMovies}
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
      {movies.length > numberOfMovies && ( 
        <section className='cards-list__add-movies'>
          <button 
            type='button'
            className='cards-list__add-movies-button'
            onClick={handleMore}>
              Ещё
          </button>
        </section>
      )}
    </section>
  );
}
