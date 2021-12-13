import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';

function Anchor({ children, path, anchorStyle, svgIcon }) {
  return (
    <Link to={path} className={`anchor ${anchorStyle || ''}`}>
      {svgIcon ? <ChevronLeft /> : null}{' '}
      <span className='h4 anchor__title'>{children}</span>
    </Link>
  );
}

export default Anchor;
