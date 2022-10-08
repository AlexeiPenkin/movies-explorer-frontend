import './MoviesCard.css';
import {useLocation} from "react-router-dom";

export function MoviesCard ({ path, movie, handleSaveMovie, handleDeleteMovie, filteredMovies }) {
  const location = useLocation();
  const {
    duration,
    id,
    image,
    nameRU,
    trailerLink,
    trailer,
    saved = false,
  } = movie;
  
  const likeButton = (location.pathname === '/saved-movies') && 'none';
  const deleteButton = (location.pathname === '/movies') && 'none';
  const movieUrl = 'https://api.nomoreparties.co';
  const moviePoster = movieUrl + image?.url;
  
  var time = Math.floor(movie.duration / 60) + 'ч ' + movie.duration % 60 + 'мин';
  
  if(duration < 60){
    time = duration % 60 + 'мин';
  }
  
  return(
    <div className='movies-card' id='card'>
        <div className='movies-card__info-block'>
          <p className='movies-card__title'>{nameRU}</p>

          <button className={`movies-card__like-button
            ${ saved ? 'movies-card__like-button_active' : '' }`}
            style={{display: likeButton}}
            onClick={() => {
              if (location.pathname === '/movies') {
                handleSaveMovie(movie)
              }
            }}
          />
          
          <button className={`movies-card__delete-button
            ${ filteredMovies ? 'movies-card__delete-button' : '' }`}
            style={{display: deleteButton}}
            onClick={() => {
              if (location.pathname === '/saved-movies'){
                handleDeleteMovie(movie)
              }
            }}
          />
        </div>
        <p className='movies-card__duration'>{time}</p>
      <a href={trailerLink || trailer} target='_blank' rel="noreferrer">
        <img src={path === '/saved-movies' ? image : moviePoster} className='movies-card__image' alt=' '/>
      </a>
    </div>
  );
}
