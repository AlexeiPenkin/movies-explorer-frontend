import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
// import { SavedMovies } from '../SavedMovies/SavedMovies';
import './MoviesCardList.css';

export function MoviesCardList ({ moviesNumber, path, handleAddMovies, handleDeleteMovie, movies, filteredMovies, saveMovie, listLength }) {

  const moviesCard = movies
    // .filter((number) => number < moviesNumber)
    .map((item) => {
    return (
      <MoviesCard 
        path={path}
        movie={item}
        filteredMovies={filteredMovies}
        saveMovie={saveMovie}
        deleteMovie={handleDeleteMovie}
        key={item.id}
        // listLength={listLength}
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
