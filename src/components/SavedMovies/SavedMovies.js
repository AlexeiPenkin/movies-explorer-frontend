import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ path, onSearch, handleFilter, filter, movies, numberOfMovies, handleMore, searching, deleteMovie, savedMovies }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        handleFilter={handleFilter}
        filter={filter}
      ></SearchForm>
      <MoviesCardList 
        // type={'movies'}
        path={path}
        movies={movies} 
        numberOfMovies={numberOfMovies} 
        savedMovies={savedMovies}
        handleMore={handleMore} 
        searching={searching}
        deleteMovie={deleteMovie}>
      </MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
