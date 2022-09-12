import { HeaderPages } from '../HeaderPages/HeaderPages';
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
      <HeaderPages />
      <main className='saved-movies'>
        <SearchForm />
        {preLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesList={saveMoviesList} type={'save'}/>
            <div className='blocks-gap'></div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
