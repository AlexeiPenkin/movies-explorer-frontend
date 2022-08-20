import './Techs.css';

export const Techs = () => {
  return (
    <section className='techs' id='techs'>
      <h1 className='techs__title'>
        Технологии
      </h1>
      <div className='description__block'>
        <h2 className='description__title'>
          7 технологий
        </h2>
        <p className='description__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className='techs__block'>
          <li className='techs__block_item'>
            HTML
          </li>
          <li className='techs__block_item'>
            CSS
          </li>
          <li className='techs__block_item'>
            JS
          </li>
          <li className='techs__block_item'>
            React
          </li>
          <li className='techs__block_item'>
            Git
          </li>
          <li className='techs__block_item'>
            Express.js
          </li>
          <li className='techs__block_item'>
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  );
};
