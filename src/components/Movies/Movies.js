import { HeaderPages } from '../HeaderPages/HeaderPages';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { moviesList } from '../../utils/moviesList';
import { Footer } from '../Footer/Footer';
import './Movies.css';
 
export const Movies = () => {
  const preLoading = false;
  return (
    <>
      <HeaderPages />
      <main className='movies'>
        <SearchForm />
        {preLoading ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesList={moviesList} type={'all'} />
            <section className='more-movies'>
              <button type='button' className='more-movies__button'>
                Ещё
              </button>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};
