import { useNavigate } from 'react-router-dom';
import { PAGE_NOT_FOUND, NOT_FOUND_STATUS } from '../../utils/constants';
import './PageNotFound.css'

export const PageNotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  
  return (
    <section className='pagenotfound'>
      <h1 className='pagenotfound__title'>
        {NOT_FOUND_STATUS}
      </h1>
      <p className='pagenotfound__subtitle'>
        {PAGE_NOT_FOUND}
      </p>
      <p className='pagenotfound__link' onClick={handleClick}>
        Назад
      </p>
    </section>
  );
}; 