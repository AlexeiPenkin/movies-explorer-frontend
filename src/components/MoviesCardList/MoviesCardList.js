import React from 'react';
import { MoviesCard } from '../MoviesCard/MoviesCard';
// import { SavedMovies } from '../SavedMovies/SavedMovies';
import './MoviesCardList.css';

export function MoviesCardList ({ moviesNumber, path, handleAddMovies, handleDeleteMovie, movies, filteredMovies, saveMovie, listLength, handleSaveMovie }) {

  const moviesCard = movies
    .filter((number) => number < moviesNumber)
    .map((item) => {
      console.log(moviesNumber); /* 12 */
    return (
      <MoviesCard 
        path={path}
        movie={item}
        filteredMovies={filteredMovies}
        saveMovie={saveMovie}
        listLength={listLength}
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
