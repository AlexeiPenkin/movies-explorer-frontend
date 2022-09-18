import './NavTab.css';

export const NavTab = () => {
  return (
    <nav className='navigation-promo'>
      <ul className='navigation-promo__block'>
        <li className='navigation-promo__block-item'>
          <a className='navigation-promo__item-link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='navigation-promo__block-item'>
          <a className='navigation-promo__item-link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navigation-promo__block-item'>
          <a className='navigation-promo__item-link' href='#about-me'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};
