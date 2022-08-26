import { useState, useContext, useEffect } from 'react';
import { Header } from '../Header/Header';
import { CurrentMoviesSaveContext } from '../../contexts/CurrentMoviesSaveContext';
import { SearchForm } from '../SearchForm/SearchForm';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { Footer } from '../Footer/Footer';
import { saveMoviesListFilter } from '../../utils/moviesListFilter';
import { NOT_FOUND_MESSAGE } from '../../utils/constants';
import './SavedMovies.css';

export const SavedMovies = ({ login, onClickDeleteMovie, openPopupsMessage }) => {
  const currentMovies = useContext(CurrentMoviesSaveContext);
  const [openPreloader, setOpenPreloader] = useState(false);
  const [filteredMoviesList, setFilteredMoviesList] = useState(currentMovies);
  const [searchText, setSearchText] = useState('');

  const onClickRequestArray = (searchData) => {
    setSearchText(searchData.text.toLowerCase());
    setOpenPreloader(true);
    const searchMoviesList = saveMoviesListFilter(
      currentMovies,
      searchData.text.toLowerCase(),
      searchData.short
    );
    return renderArray(searchMoviesList);
  };

  const onClickShortMovie = (searchData) => {
    const searchMoviesList = saveMoviesListFilter(currentMovies, searchText, searchData);
    return renderArray(searchMoviesList);
  };

  const renderArray = (array) => {
    if (array.length === 0) {
      openPopupsMessage(NOT_FOUND_MESSAGE);
    } else {
      setFilteredMoviesList(array);
    }
    return setOpenPreloader(false);
  };

  useEffect(() => {
    setFilteredMoviesList(currentMovies);
    return setSearchText('');
  }, [currentMovies]);

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
          currentMovies.length > 0 && (
            <>
              <MoviesCardList
                moviesList={filteredMoviesList}
                type={'save'}
                onClickButtonMovie={onClickDeleteMovie}
              />
              <div className='block__gap'></div>
            </>
          )
        )}
      </main>
      <Footer />
    </>
  );
};
