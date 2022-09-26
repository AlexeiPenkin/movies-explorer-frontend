import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ movieCards, handleDeleteMovie, listLength, onSearch, durationSwitch, handleAddMovies, savedMovies }) {
  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        movieCards={movieCards}
        addMovies={handleAddMovies}
        savedMovies={savedMovies} 
        listLength={listLength}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
