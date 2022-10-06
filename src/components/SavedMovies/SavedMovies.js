import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ onSearchSaved, savedDurationSwitch, moviesCard, savedFilteredMovies, savedMoviesNumber, handleAddMovies, handleDeleteMovie }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearchSaved}
        durationSwitch={savedDurationSwitch}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={savedFilteredMovies}
        moviesNumber={savedMoviesNumber}
        handleAddMovies={handleAddMovies}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
