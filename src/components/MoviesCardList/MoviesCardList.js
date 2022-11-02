import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import { DEVICE_PARAMS } from '../../utils/constants';
import { getSavedMovieCard } from '../../utils/utils';
import { MoviesCard } from '../MoviesCard/MoviesCard';


// export function MoviesCardList({ moviesList, savedMoviesList, isCardLiked, handleAddMovies, handleSaveMovie, handleDeleteMovie, moviesNumber, moviesCard }) {
//   const screenWidth = useScreenWidth();

  // const { desktop, tablet, mobile } = DEVICE_PARAMS;
  // const [isMount, setIsMount] = useState(true);
  // const [showMovieList, setShowMovieList] = useState([]);
  // const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 3 });

  // const location = useLocation();

  // количество отображаемых карточек при разной ширине экрана
  // useEffect(() => {
  //   if (location.pathname === '/movies') {
  //     if (screenWidth > desktop.width) {
  //       setCardsShowDetails(desktop.cards);
  //     } else if (screenWidth <= desktop.width && screenWidth > mobile.width) {
  //       setCardsShowDetails(tablet.cards);
  //     } else {
  //       setCardsShowDetails(mobile.cards);
  //     }
  //     return () => setIsMount(false);
  //   }
  // }, [screenWidth, isMount, desktop, tablet, mobile, location.pathname]);

  // изменяем отображаемый массив фильмов в зависимости от ширины экрана
  // useEffect(() => {
  //   if (moviesList.length) {
  //     const res = moviesList.filter((item, i) => i < cardsShowDetails.total);
  //     setShowMovieList(res);
  //   }
  // }, [moviesList, cardsShowDetails.total]);

  // добавление карточек при клике по кнопке "Еще"
  // function handleClickMoreMovies() {
  //   const start = showMovieList.length;
  //   const end = start + cardsShowDetails.more;
  //   const additional = moviesList.length - start;

  //   if (additional > 0) {
  //     const newCards = moviesList.slice(start, end);
  //     setShowMovieList([...showMovieList, ...newCards]);
  //   }
  // }

//   return (
//     <section className="cards-list">
//       <div className="cards-list__grid">
//         {showMovieList.map(movie => (
//           <MoviesCard
//             key={movie.id || movie._id}
//             saved={getSavedMovieCard(savedMoviesList, movie)}
//             isCardLiked={isCardLiked}
//             handleSaveMovie={handleSaveMovie}
//             handleDeleteMovie={handleDeleteMovie}
//             movie={movie}
//           />
//         ))}
//       </div>
//       {location.pathname === '/movies' && showMovieList.length >= 5 && showMovieList.length < moviesList.length && (
//         <button
//           className="cards-list__add-movies-button"
//           onClick={handleAddMovies}
//         >
//           Ещё
//         </button>
//       )}
//     </section>
//   );
// }


// import { React, useState, useEffect } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import useScreenWidth from '../../hooks/useScreenWidth.jsx';
// // import { DEVICE_PARAMS } from '../../utils/constants';
// import { getSavedMovieCard } from '../../utils/utils';
// import { MoviesCard } from '../MoviesCard/MoviesCard';
// import './MoviesCardList.css';

export function MoviesCardList ({ moviesList, moviesNumber, path, savedMoviesList, handleSaveMovie, handleDeleteMovie, handleAddMovies, isCardLiked }) {
  // console.log(moviesList)
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
      {moviesList.length > moviesNumber && ( 
        <section className='cards-list__add-movies'>
          <button 
            type='button'
            className='cards-list__add-movies-button'
            onClick={handleAddMovies}>
              Ещё
          </button>
        </section>
      )}
      {!moviesList.length && moviesNumber ? (
        <p className='cards-list__message'>Ничего не найдено</p>
      ) : undefined
      }
    </section>
 );
}
