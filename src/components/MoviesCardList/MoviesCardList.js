import { React, useState } from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { SavedMovies } from '../SavedMovies/SavedMovies';
import './MoviesCardList.css';

export function MoviesCardList ({ moviesNumber, path, handleAddMovies, handleDeleteMovie }) {
  const [movies, setMovies] = useState([]);
  const movieCards = movies
    .filter((number) => number < moviesNumber)
    .map((movie) => {
    return (
      <MoviesCard 
        path={path}
        movie={movie}
        // savedMovie={SavedMovies}
        deleteMovie={handleDeleteMovie}
        key={movie._id}
      />
    )
  })
  return(
    <section className='cards-list'>
      <div className='cards-list__grid'>
        {movieCards}
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
