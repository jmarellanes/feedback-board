import { useState, useRef, useEffect, useCallback } from 'react';

import HeaderBrandmark from './HeaderBrandmark';
import NavMain from './NavMain';
import RoadmapCard from './RoadmapCard';

import { ReactComponent as Hamburguer } from '../assets/images/hamburguer.svg';

function Header({ categories, status }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const headerRef = useRef();
  const headerMainNavRef = useRef();

  const handleClick = useCallback(() => {
    const mainFeedbackList = headerRef.current.nextElementSibling;

    headerMainNavRef.current.removeAttribute('hidden');
    mainFeedbackList.setAttribute('aria-hidden', !isOpen);

    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      mainFeedbackList.setAttribute('tabindex', -1);
    }

    setTimeout(() => {
      setIsOpen((isOpen) => !isOpen);
    }, 50);
  }, [isOpen]);

  const handleKeyDown = useCallback((e) => {
    let KEY_TAB = 'Tab';
    let KEY_ESC = 'Escape';

    const focusableElements =
      'button, [href], li > [href], [tabindex]:not([tabindex="-1"])';
    const focusableContent =
      headerRef.current.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    switch (e.key) {
      case KEY_TAB:
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
        break;

      case KEY_ESC:
        setOpenMenu((openMenu) => !openMenu);
        break;

      default:
        break;
    }
  }, []);

  const handleTransitionEnd = () => {
    if (isOpen) return;
    const mainFeedbackList = headerRef.current.nextElementSibling;

    headerMainNavRef.current.setAttribute('hidden', '');
    mainFeedbackList.removeAttribute('tabindex');
    mainFeedbackList.removeAttribute('aria-hidden');
    document.body.style.removeProperty('overflow');

    document.removeEventListener('keydown', handleKeyDown);
  };

  const focusedElBeforeOpen = document.activeElement;
  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    document.addEventListener('keydown', handleKeyDown);
    handleClick();

    return () => {
      focusedElBeforeOpen.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu]);

  const hamburguerButton = (
    <button
      className='header-main__icon--toggle'
      aria-labelledby='menu-label'
      aria-expanded='false'
      onClick={() => setOpenMenu(!openMenu)}
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
    <header
      className={`header-main ${isOpen ? 'header-main__isOpen' : ''} `}
      ref={headerRef}
    >
      <div className='header-main__container'>
        <HeaderBrandmark title='FeedbackTo' />
        {hamburguerButton}
        <div
          className={`header-main__navigation`}
          ref={headerMainNavRef}
          hidden
        >
          <NavMain categories={categories} />
          <RoadmapCard statusList={status} />
        </div>
      </div>
      <div
        className='header-main__sliding-background'
        onTransitionEnd={handleTransitionEnd}
      ></div>
    </header>
  );
}

export default Header;
