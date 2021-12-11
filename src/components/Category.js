import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Category({ category, children, isActive }) {
  const params = useParams();
  const categoryParam = !params.categoryParam ? 'all' : params.categoryParam;

  return (
    <li className='category__item'>
      <Link
        to={category}
        className={`category__link ${
          categoryParam === category.toLowerCase()
            ? 'category__link--active'
            : ''
        } ${!isActive ? 'isInactive' : ''}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default Category;
