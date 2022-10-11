import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';

export function SavedMovies ({ onSearch, durationSwitch, handleFilter, filter, moviesCard, filteredMovies, moviesNumber, handleAddMovies, handleSaveMovie, handleDeleteMovie, isCardLiked }) {

  return(
    <section className='savedMovies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
        handleFilter={handleFilter}
        filter={filter}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={filteredMovies}
        moviesNumber={moviesNumber}
        handleAddMovies={handleAddMovies}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        isCardLiked={isCardLiked}
      ></MoviesCardList>
      <Footer></Footer>
    </section>
  );
}
