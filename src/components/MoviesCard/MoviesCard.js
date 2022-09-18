import './MoviesCard.css';

export function MoviesCard ({ path, movie, saveMovie, deleteMovie }) {
  const {
    country,
    director,
    duration,
    year,
    saved = false,
    description,
    image,
    trailerLink,
    thumbnail,
    trailer,
    id,
    nameRU,
    nameEN,
  } = movie;
  
  const likeVisible = (path === '/saved-movies') && 'none';
  const deleteVisible = (path === '/movies') && 'none';
  const movieUrl = 'https://api.nomoreparties.co';
  const poster = movieUrl + image?.url;
  
  var time = Math.floor(movie.duration / 60) + 'ч ' + movie.duration % 60 + 'мин';
  
  if(duration < 60){
    time = duration % 60 + 'мин';
  }

  function handleSave() {
    if(!movie.saved) {
      saveMovie(movie);
    } else {
      deleteMovie(id);
    }
  }

  function handleDelete() {
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
            onClick={handleSave}
            style={{display: likeVisible}}
          >
          </button>
          <button 
            className='movies-card__delete-button' 
            onClick={handleDelete}
            style={{display: deleteVisible}}
          >
          </button>
        </div>
        <p className='movies-card__duration'>{time}</p>
      </div>
      <a href={trailerLink || trailer} target='_blank' rel="noreferrer">
        <img src={path === '/saved-movies' ? image : poster} className='movies-card__img' alt=' '/>
      </a>
    </div>
  );
}
