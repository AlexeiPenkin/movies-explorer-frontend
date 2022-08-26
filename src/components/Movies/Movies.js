import { useEffect, useState } from 'react';
import { Header } from '../Header/Header';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
// import { moviesList } from '../../utils/moviesList';
import { getMoviesListFetch } from '../../utils/MoviesApi';
import { NOT_FOUND_MESSAGE, ERROR_SERVER_MESSAGE } from '../../utils/constants';
import { Footer } from '../Footer/Footer';
import './Movies.css';
import { moviesListFilter } from '../../utils/moviesListFilter';

export const Movies = ({ login, onClickSaveMovie, openPopupsMessage }) => {
  const [openPreloader, setOpenPreloader] = useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);
  const [isRender, setIsRender] = useState(true);

  const onClickRequestArray = async (searchData) => {
    setOpenPreloader(true);
    const arrayAllMovies = localStorage.getItem('arrayAllMovies');
    if (!arrayAllMovies) {
      const allMovies = await getMoviesListFetch();
      if (allMovies) {
        localStorage.setItem('arrayAllMovies', JSON.stringify(allMovies));
      } else {
        openPopupsMessage(ERROR_SERVER_MESSAGE);
      }
    }
    localStorage.setItem('searchText', searchData.text.toLowerCase());
    localStorage.setItem('shortFilter', searchData.short);
    const arraySearch = moviesListFilter();
    return renderArray(arraySearch);
  };

  const onClickShortMovie = (searchData) => {
    localStorage.setItem('shortFilter', searchData);
    const arraySearch = moviesListFilter();
    return renderArray(arraySearch);
  };

  const renderArray = (array) => {
    if (array.length === 0) {
      openPopupsMessage(NOT_FOUND_MESSAGE);
    } else {
      setFilteredMoviesList(array);
    }
    setIsRender(true);
    return setOpenPreloader(false);
  };

  useEffect(() => {
    const arrayAllMovies = localStorage.getItem('arrayAllMovies');
    if (!arrayAllMovies) {
      setIsRender(false);
      return;
    }
    const arraySearch = moviesListFilter();
    setIsRender(true);
    renderArray(arraySearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header login={login} />
      <main className='movies'>
        <SearchForm 
          onClickRequestArray={onClickRequestArray}
          openPopupsMessage={openPopupsMessage}
          type={'allMovies'}
          onClickShortMovie={onClickShortMovie} 
        />
        {openPreloader ? (
          <Preloader />
        ) : (
          isRender && (
            <MoviesCardList
              moviesList={filteredMoviesList}
              type={'all'}
              onClickButtonMovie={onClickSaveMovie}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
};
