import React from 'react';

function NavMain() {
  return (
    <nav className='header-main__nav-main nav-main' aria-labelledby='main-menu'>
      <h2 id='main-menu' hidden>
        Main Menu
      </h2>
      <ul className='nav-main__element'>
        <li className='nav-main__item'>
          <a href='#0' className='nav-main__link'>
            Tags
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavMain;
