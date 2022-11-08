import './MoviesCardList.css';
import { getSavedMovieCard } from '../../utils/utils';
import { MoviesCard } from '../MoviesCard/MoviesCard';


export function MoviesCardList ({
  moviesList,
  moviesNumber,
  path,
  savedMoviesList,
  handleSaveMovie,
  handleDeleteMovie,
  handleAddMovies,
  isCardLiked,
  isLoading,
  nothingFound,
}) {

  const moviesCard = moviesList
    .filter((item, number) => number < moviesNumber)
    .map((item) => {
    return (
      <MoviesCard 
        path={path}
        movie={item}
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        key={item.id || item._id}
        isCardLiked={isCardLiked}
        saved={getSavedMovieCard(savedMoviesList, item)}
      />
    )
  })
  return(
    <section className='cards-list'>
      <div className='cards-list__grid'>
        {moviesCard}
      </div>
      {
        moviesList.length > moviesNumber && ( 
          <section className='cards-list__add-movies'>
            <button 
              type='button'
              className='cards-list__add-movies-button'
              onClick={handleAddMovies}>
                Ещё
            </button>
          </section>
        )
      }
      {
        !isLoading 
        && nothingFound
        && (<p className='cards-list__message'></p>)
      }
    </section>
 );
}
