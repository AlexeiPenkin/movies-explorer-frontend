import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({ moviesList, type }) => {
  return (
    <section className='movie-card-list'>
      <ul className='elements'>
        {moviesList.map((movie) => {
          return <MoviesCard movie={movie} key={movie._id} type={type} />;
        })}
      </ul>
    </section>
  );
};
