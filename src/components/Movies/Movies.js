import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ movieCards, onSave, savedMovies, onSearch, durationSwitch, listLength, addMovies, handleDeleteMovie, currentUser }) {
  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        currentUser={currentUser}
        movieCards={movieCards}
        addMovies={addMovies}
        onSave={onSave}
        savedMovies={savedMovies}
        listLength={listLength}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
 