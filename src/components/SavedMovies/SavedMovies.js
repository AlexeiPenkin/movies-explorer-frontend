import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ onSearch, durationSwitch, moviesCard, filteredMovies, moviesNumber, handleAddMoviesSaved, handleDeleteMovie, handleSaveMovie }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={filteredMovies}
        moviesNumber={moviesNumber}
        handleAddMovies={handleAddMoviesSaved}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
