import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList ({ moviesNumber, path, handleAddMovies, handleDeleteMovie, movies, handleSaveMovie }) { 
  const moviesCard = movies
    .filter((item, number) => number < moviesNumber)
    .map((item) => {
    return (
      <MoviesCard 
        path={path}
        movie={item}
        onSave={handleSaveMovie}
        deleteMovie={handleDeleteMovie}
        key={item.id}
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
