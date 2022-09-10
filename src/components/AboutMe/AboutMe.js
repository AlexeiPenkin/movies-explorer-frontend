import photo from '../../image/Student_я.jpg';
import './AboutMe.css';

export const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <h1 className='title'>Студент</h1>
      <div className='about-me__content'>
        <div className='content-description'>
          <h2 className='about-me__name'>Алексей</h2>
          <h3 className='about-me__profession'>Фронтенд-разработчик, 47лет</h3>
          <p className='about-me__description'>
            Я родился в г.Бирск, Республика Башкортостан, закончил факультет иностранных языков БГПИ. 
            Женат, есть дочь. 
            Работал переводчиком в нефтегазовой промышленности. После потери основной работы я решил сменить профессию и выбрал фронтенд-разработку! Надеюсь новые знания помогут мне в будущем!
          </p>
          <ul className='about-me__link-block'>
            <li className='about-me__link-block-item'>
              <a className='about-me__link'
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://facebook.com/'
              >Facebook
              </a>
            </li>
            <li className='about-me__link-block-item'>
              <a className='about-me__link'
                target={'_blank'}
                rel='noopener noreferrer'
                href='https://github.com/AlexeiPenkin'
              >Github
              </a>
            </li>
          </ul>
        </div>
        <img className='photo' alt='Фото' src={photo} />
      </div>
    </section>
  );
};
