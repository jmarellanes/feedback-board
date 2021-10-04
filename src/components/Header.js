import React from 'react';

function Header({ children }) {
  return (
    <header className='header-main header'>
      <div className='header-main__container'>{children}</div>
    </header>
  );
}

export default Header;
