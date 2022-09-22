import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ movieCards, handleDeleteMovie, listLength, onSearch, durationSwitch, addMovies, savedMovies }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        movieCards={movieCards}
        onDelete={handleDeleteMovie}
        listLength={listLength}
        addMovies={addMovies}
        savedMovies={savedMovies} 
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
