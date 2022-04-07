import { Link, useParams } from 'react-router-dom';

function Category({ category, isActive }) {
  const { categoryParam } = useParams();
  const cat = category.toLowerCase();

  const stopEvent = (e) => {
    if (e.target.classList.contains('category__link--active'))
      e.preventDefault();
  };

  return (
    <li className='category__item'>
      <Link
        to={cat}
        className={`category__link ${
          categoryParam === cat ? 'category__link--active' : ''
        } ${!isActive ? 'isInactive' : ''}`}
        onClick={stopEvent}
      >
        {cat}
      </Link>
    </li>
  );
}

export default Category;
