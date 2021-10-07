import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';

function Anchor({ children, path, anchorStyle, svgIcon }) {
  return (
    <Link to={path} className={`anchor ${anchorStyle || ''}`}>
      {svgIcon ? <ChevronLeft /> : null} <h4>{children}</h4>
    </Link>
  );
}

export default Anchor;
