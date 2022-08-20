import { HeaderSavedMovies } from '../HeaderSavedMovies/HeaderSavedMovies';
import { moviesList } from '../../utils/moviesList';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import './SavedMovies.css';


export const SavedMovies = () => {
  const preLoading = false;
  const saveMoviesList = moviesList.filter((movie) => movie.save);
  return (
    <>
      <HeaderSavedMovies />
      <main className='saved-movies'>
        <SearchForm />
        {preLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesList={saveMoviesList} type={'save'}/>
            <div className='indent'></div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
