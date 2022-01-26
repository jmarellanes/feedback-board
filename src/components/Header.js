import { useState, useRef } from 'react';

import HeaderBrandmark from './HeaderBrandmark';
import NavMain from './NavMain';
import RoadmapCard from './RoadmapCard';

import { ReactComponent as Hamburguer } from '../assets/images/hamburguer.svg';

function Header({ categories, status }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const hamburguerButton = (
    <button
      className='header-main__icon--toggle'
      aria-labelledby='menu-label'
      aria-expanded={isOpen}
      onClick={handleClick}
    >
      <span id='menu-label' hidden>
        Main menu
      </span>
      <span className='toggle__icon'>
        <Hamburguer />
      </span>
    </button>
  );

  return (
    <header className={`header-main ${isOpen ? 'header-main__isOpen' : ''} `}>
      <div className='header-main__container'>
        <HeaderBrandmark title='FeedbackTo' />
        {hamburguerButton}
        <div className={`header-main__navigation`}>
          <NavMain categories={categories} />
          <RoadmapCard statusList={status} />
        </div>
      </div>
      <div className='header-main__sliding-background'></div>
    </header>
  );
}

export default Header;
