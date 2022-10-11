import { useHistory } from 'react-router-dom';
import './PageNotFound.css';

export const PageNotFound = () => {
  const history = useHistory();

  const goBack = () => {
      history.goBack();
  }

  return (
    <main className='pagenotfound'>
      <h1 className='pagenotfound__title'>
        404
      </h1>
      <h2 className='pagenotfound__subtitle'>
        Страница не найдена
      </h2>
      <p onClick={goBack} className='pagenotfound__link'>Назад</p>
    </main>
  );
}; 
