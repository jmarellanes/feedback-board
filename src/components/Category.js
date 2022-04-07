import { Link, useParams } from 'react-router-dom';

function Category({ category, isActive }) {
  const { categoryParam } = useParams();
  const cat = category.toLowerCase();

  return (
    <li className='category__item'>
      <Link
        to={cat}
        className={`category__link ${
          categoryParam === cat ? 'category__link--active' : ''
        } ${!isActive ? 'isInactive' : ''}`}
      >
        {cat}
      </Link>
    </li>
  );
}

export default Category;
