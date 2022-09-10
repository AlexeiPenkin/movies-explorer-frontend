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
    nameEN
  } = movie;
  
  const likeVisible = (path === '/saved-movies') && 'none';
  const deleteVisible = (path === '/movies') && 'none';
  const movieUrl = 'https://api.nomoreparties.co';
  const poster = movieUrl + image?.url;
  
  var time = Math.floor(movie.duration / 60) + 'ч' + movie.duration % 60 + 'мин';
  
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
    <div className='moviesCard' id='card'>
      <a
        href={trailerLink || trailer}
        target='_blank' 
        rel="noreferrer"
      >
        <img 
          src={path === '/saved-movies' ? image : poster}
          className='moviesCard__img'
          alt=' '
        />
      </a>
      <div className='moviesCard__info'>
        <div className='moviesCard__info-area'>
          <p
            className='moviesCard__name'
          >{nameRU}</p>
          <button 
            className={`moviesCard__like ${
              saved 
              ? 'moviesCard__like_active'
              : ''
            }`}
            onClick={handleSave}
            style={{display: likeVisible}}
          ></button>
          <button 
            className='moviesCard__delete'
            onClick={handleDelete}
            style={{display: deleteVisible}}  
          ></button>
        </div>
        <p className='moviesCard__time'>{time}</p>
      </div>
    </div>
  );
}
