import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import './Movies.css';

export function Movies ({ path, onSearch, handleFilter, filter, movies, numberOfMovies, handleMore, searching, saveMovie, deleteMovie }) {
  
  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        handleFilter={handleFilter}
        filter={filter}
      />
      <MoviesCardList 
        path={path} 
        movies={movies} 
        numberOfMovies={numberOfMovies} 
        handleMore={handleMore} 
        searching={searching}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      ></MoviesCardList>
    </section>
  );
}
