import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList ({ path, movies, numberOfMovies, handleMore, searching, saveMovie, deleteMovie, filter }) {
  
  const moviesCard = movies
    .filter((card, number) => number < numberOfMovies)
    .map((item) => {
    return (
      <MoviesCard 
        path={path}
        movie={item}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
        key={item.id}
      />
    )
  })

  return(
    <section className='moviesCardList'>
      <div className='moviesCardList__list'>
        {moviesCard}
      </div>
      {movies.length > numberOfMovies && ( 
      <button className='moviesCardList__more-btn' onClick={handleMore}>Ещё</button> 
      )}
      {/* {!movies.length && !searching && path === '/movies' ? (
        <p className='moviesCardList__text'>Начните поиск</p>
      ) : undefined 
      }
      {!movies.length && !searching && path === '/saved-movies' ? (
        <p className='moviesCardList__text'>Добавьте фильм в избранное</p>
      ) : undefined 
      }
      {!movies.length && searching ? (
        <p className='moviesCardList__text'>Ничего не найдено</p>
      ) : undefined
      } */}
    </section>
  );
}
