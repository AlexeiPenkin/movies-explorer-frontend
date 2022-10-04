import './MoviesCard.css';

export function MoviesCard ({ path, movie, saveMovie, deleteMovie }) {
  const {
    duration,
    id,
    image,
    nameRU,
    trailerLink,
    trailer,
    saved = false,
  } = movie;
  
  const likeButton = (path === '/saved-movies') && 'none';
  const deleteButton = (path === '/movies') && 'none';
  const movieUrl = 'https://api.nomoreparties.co';
  const moviePoster = movieUrl + image?.url;
  
  var time = Math.floor(movie.duration / 60) + 'ч ' + movie.duration % 60 + 'мин';
  
  if(duration < 60){
    time = duration % 60 + 'мин';
  }

  function handleSaveMovie() {
    if(!movie.saved) {
      saveMovie(movie); 
    } else {
      deleteMovie(id);
    }
  }

  function handleDeleteMovie() {
    deleteMovie(movie);
  }
  
  return(
    <div className='movies-card' id='card'>
      <div className='movies-card__info'>
        <div className='movies-card__info-block'>
          <p className='movies-card__title'>
            {nameRU}
          </p>
          <button 
            className={`movies-card__like-button
            ${ saved ? 'movies-card__like-button_active' : '' }`}
            onClick={handleSaveMovie}
            style={{display: likeButton}}
          >
          </button>
          <button 
            className='movies-card__delete-button' 
            onClick={handleDeleteMovie}
            style={{display: deleteButton}}
          >
          </button>
        </div>
        <p className='movies-card__duration'>{time}</p>
      </div>
      <a href={trailerLink || trailer} target='_blank' rel="noreferrer">
        <img src={path === '/saved-movies' ? image : moviePoster} className='movies-card__img' alt=' '/>
      </a>
    </div>
  );
}
