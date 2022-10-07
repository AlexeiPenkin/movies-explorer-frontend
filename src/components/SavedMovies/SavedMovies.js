import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ onSearchSaved, savedDurationSwitch, moviesCard, filteredMovies, savedMoviesNumber, handleAddMoviesSaved, handleDeleteMovie, localSavedData }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearchSaved}
        durationSwitch={savedDurationSwitch}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={filteredMovies}
        moviesNumber={savedMoviesNumber}
        handleAddMovies={handleAddMoviesSaved}
        deleteMovie={handleDeleteMovie}
        // savedMovies={localSavedData}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
