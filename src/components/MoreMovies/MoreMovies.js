import './MoreMovies.css';

export const MoreMovies = ({ addCounter }) => {
  return (
    <section className='more-movies'>
      <button type='button' className='more-movies__button' onClick={addCounter}>
        Ещё
      </button>
    </section>
  );
};
