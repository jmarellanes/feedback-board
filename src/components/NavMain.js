import React from 'react';
import Category from './Category';

function NavMain({ categories }) {
  return (
    <nav className='header-main__nav-main nav-main' aria-labelledby='main-menu'>
      <h2 id='main-menu' className='visually-hidden'>
        Main Menu
      </h2>
      <ul className='nav-main__element'>
        {categories.map((category) => {
          return (
            <Category category={category} key={category} isActive>
              {category}
            </Category>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMain;
