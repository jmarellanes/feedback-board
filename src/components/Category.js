import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Category({ category, children }) {
  const params = useParams();
  const categorySlug = !params.categorySlug ? 'all' : params.categorySlug;

  return (
    <li className='nav-main__item'>
      <Link
        to={category.toLowerCase()}
        className={`nav-main__link ${
          categorySlug === category.toLowerCase()
            ? 'nav-main__link--active'
            : ''
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

export default Category;
