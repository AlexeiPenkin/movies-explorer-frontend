import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <h1 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h1>
      <div className='footer__info'>
        <p className='footer__year'>&copy; 2022</p>
        <ul className='footer__block'>
          <li className='footer__block-item'>
            <a className='footer__block-link'
              target={'_blank'}
              rel='noopener noreferrer'
              href='https://practicum.yandex.ru/'>Яндекс.Практикум
            </a>
          </li>
          <li className='footer__block-item'>
            <a className='footer__block-link'
              target={'_blank'}
              rel='noopener noreferrer'
              href='https://github.com/AlexeiPenkin'>Github
            </a>
          </li>
          <li className='footer__block-item'>
            <a className='footer__block-link'
              target={'_blank'}
              rel='noopener noreferrer'
              href='https://facebook.com/'>Facebook
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
