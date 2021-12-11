import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Category({ category, children, isActive }) {
  const params = useParams();
  const categoryParam = !params.categoryParam ? 'all' : params.categoryParam;

  return (
    <li className='nav-main__item'>
      <Link
        to={category}
        className={`nav-main__link ${
          categoryParam === category.toLowerCase()
            ? 'nav-main__link--active'
            : ''
        } ${!isActive ? 'isInactive' : ''}`}
      >
        {children}
      </Link>
    </li>
  );
}

export default Category;
