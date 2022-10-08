import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ onSearch, durationSwitch, moviesCard, filteredMovies, moviesNumber, handleSaveMovie, handleAddMovies, handleDeleteMovie }) {

  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={filteredMovies}
        moviesNumber={moviesNumber}
        handleAddMovies={handleAddMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
