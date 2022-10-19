import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Footer } from '../Footer/Footer';
import './Movies.css';

export function Movies ({ onSearch, durationSwitch, handleFilter, filter, moviesCard, initialMovies, moviesNumber, handleAddMovies, handleSaveMovie, handleDeleteMovie, isCardLiked }) {

  return(
    <section className='movies'>
      <SearchForm 
        onSearch={onSearch}
        durationSwitch={durationSwitch}
        handleFilter={handleFilter}
        filter={filter}
      ></SearchForm>
      <MoviesCardList 
        moviesCard={moviesCard}
        movies={initialMovies}
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
