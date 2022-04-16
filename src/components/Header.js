import { useState, useRef, useEffect, useCallback } from 'react';

import HeaderBrandmark from './HeaderBrandmark';
import NavMain from './NavMain';
import RoadmapCard from './RoadmapCard';
import ToggleMode from './ToggleMode';

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
        setOpenMenu((openMenu) => false);
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

  const handleHiddenMainNav = (e) => {
    if (e.matches) {
      headerMainNavRef.current.setAttribute('hidden', '');
    } else {
      headerMainNavRef.current.removeAttribute('hidden', '');
    }
  };

  const focusedElBeforeOpen = document.activeElement;
  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    document.addEventListener('keydown', handleKeyDown);
    handleClick();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.removeProperty('overflow');
      focusedElBeforeOpen.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openMenu]);

  useEffect(() => {
    let root = document.documentElement;
    const breakpoint = getComputedStyle(root).getPropertyValue(
      '--breakpoint__medium--m'
    );
    const hiddenHeaderMainNav = window.matchMedia(breakpoint);

    hiddenHeaderMainNav.addEventListener('change', handleHiddenMainNav);

    if (hiddenHeaderMainNav.matches)
      headerMainNavRef.current.setAttribute('hidden', '');

    return () => {
      hiddenHeaderMainNav.removeEventListener('change', handleHiddenMainNav);
    };
  }, []);

  const hamburguerButton = (
    <button
      className='header-main__button--toggle button--nav-toggle'
      aria-labelledby='menu-label'
      aria-expanded={isOpen}
      onClick={() => setOpenMenu(!openMenu)}
      type='button'
    >
      <span id='menu-label' hidden>
        Main menu
      </span>
      <Hamburguer />
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
          className={`header-main__navigation-container`}
          ref={headerMainNavRef}
        >
          <NavMain categories={categories} />
          <RoadmapCard statusList={status} />
          <ToggleMode />
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
