import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ onSearch, durationSwitch, currentUser, movieCards, handleAddMovies, onSave, savedMovies, listLength, handleDeleteMovie, movies }) {
  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        movies={movies}
        currentUser={currentUser}
        movieCards={movieCards}
        addMovies={handleAddMovies}
        onSave={onSave}
        savedMovies={savedMovies}
        listLength={listLength}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
