import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ moviesCard, handleDeleteMovie, listLength, onSearch, savedDurationSwitch, handleAddMovies, savedMovies, filteredMovies, moviesNumber }) {

  // console.log(moviesNumber) /* 12 */

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        savedDurationSwitch={savedDurationSwitch}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={filteredMovies}
        moviesNumber={moviesNumber}
        savedMovies={savedMovies} 
        listLength={listLength}
        handleAddMovies={handleAddMovies}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
