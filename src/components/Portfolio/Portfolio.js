import './Portfolio.css';

export const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h1 className='portfolio__title'>Портфолио</h1>
      <ul className='website__list'>
        <li className='website__list-item'>
          <a className='website__list-item-link'
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://github.com/AlexeiPenkin/russian-travel'
          >
            <p className='website__list-item-title'>Статичный сайт</p>
            <p className='website__list-item-arrow'>↗</p>
          </a>
        </li>

        <li className='website__list-item'>
          <a className='website__list-item-link'
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://github.com/AlexeiPenkin/Mesto'
          >
            <p className='website__list-item-title'>Адаптивный сайт</p>
            <p className='website__list-item-arrow'>↗</p>
          </a>
        </li>
        <li className='website__list-item'>
          <a className='website__list-item-link'
            target={'_blank'}
            rel='noopener noreferrer'
            href='https://github.com/AlexeiPenkin/react-mesto-api-full'
          >
            <p className='website__list-item-title'>Одностраничное приложение</p>
            <p className='website__list-item-arrow'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
};
