import { useState } from 'react';

function Category({ children }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      className={`category ${isActive ? 'category--active' : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      <span className='category__name'>{children}</span>
    </button>
  );
}

export default Category;
