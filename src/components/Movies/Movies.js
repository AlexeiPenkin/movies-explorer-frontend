import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ moviesCard, onSearch, durationSwitch, handleAddMovies, handleSaveMovie, listLength, handleDeleteMovie, filteredMovies, moviesNumber }) {

  console.log(moviesNumber) /* 12 */

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
        onSave={handleSaveMovie}
        listLength={listLength}
        handleAddMovies={handleAddMovies}
        onDelete={handleDeleteMovie}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
