import './NavTab.css';

export const NavTab = () => {
  return (
    <nav className='navigation'>
      <ul className='navigation__block'>
        <li className='navigation__block-item'>
          <a className='navigation__item-link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='navigation__block-item'>
          <a className='navigation__item-link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='navigation__block-item'>
          <a className='navigation__item-link' href='#about-me'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};
