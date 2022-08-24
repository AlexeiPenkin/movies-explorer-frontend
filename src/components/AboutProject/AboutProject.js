import './AboutProject.css';

export const AboutProject = () => {
  return (
    <section className='about-project' id='about-project'>
      <h1 className='about-project__title'>
        О проекте
      </h1>

      <ul className='about-project__content'>

        <li className='about-project__content_item'>
          <h2 className='content_item__subtitle'>
            Дипломный проект включал 5 этапов
          </h2>
          <p className='content_item__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>

        <li className='about-project__content_item'>
          <h2 className='content_item__subtitle'>
            На выполнение диплома ушло 5 недель
          </h2>
          <p className='content_item__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>

      </ul>

      <div className='timeline__wrapper'>

        <div className='timeline__span timeline__span_backend'>
          <p className='timeline__span-period timeline__span-period_one-week'>
            1 неделя
          </p>
          <p className='timeline__title'>
            Back-end
          </p>
        </div>

        <div className='timeline__span timeline__span_frontend'>
          <p className='timeline__span-period timeline__span-period_four-week'>
            4 недели
          </p>
          <p className='timeline__title'>
            Front-end
          </p>
        </div>

      </div>
    </section>
  );
};
