import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ path, onSearch, handleFilter, filter, movies, numberOfMovies, handleMore, searching, saveMovie, deleteMovie }) {
  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        handleFilter={handleFilter}
        filter={filter}
      ></SearchForm>
      <MoviesCardList 
        type={'movies'}
        path={path}
        movies={movies} 
        numberOfMovies={numberOfMovies} 
        handleMore={handleMore} 
        searching={searching}
        saveMovie={saveMovie}
        deleteMovie={deleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
 