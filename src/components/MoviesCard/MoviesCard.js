import './MoviesCard.css';

export const MoviesCard = ({ movie, type }) => {
  const { image, nameRU, save } = movie;

  return (
    <section className='movie-card'>
      <img className='movie__image' src={image} alt={nameRU} />
      <div className='movie__info'>
        <div className='movie__text'>
          <h1 className='movie__title'>{nameRU}</h1>
        </div>
        {type === 'all' ? (
          save ? (
            <button
              type='button'
              className='movie__button movie__button_type_active'
            ></button>
          ) : (
            <button
              type='button'
              className='movie__button movie__button_type_disabled'
            ></button>
          )
        ) : (
          <button
            type='button'
            className='movie__button movie__button_type_close'
          ></button>
        )}
      </div>
      <div className='movie__title-line'></div>
      <p className='movie__duration'>1ч 42м</p>
    </section>
  );
};

