import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export function MoviesCardList ({ movies, moviesNumber, path, handleSaveMovie, handleDeleteMovie, handleAddMovies, isCardLiked }) { 
  const moviesCard = movies
    .filter((item, number) => number < moviesNumber)
    .map((item) => {
    return (
      <MoviesCard 
        path={path}
        movie={item}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        key={item.id}
        isCardLiked={isCardLiked}
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
      {!movies.length && moviesNumber ? (
        <p className='moviesCardList__text'>Ничего не найдено</p>
      ) : undefined
      }
    </section>
 );
}
