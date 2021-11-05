import { Link } from 'react-router-dom';
import Category from './Category';
import Upvotes from './Upvotes';
import { ReactComponent as CommentsIcon } from '../assets/images/comments.svg';

function FeedbackItem({
  title,
  description,
  upvotes,
  category,
  comments,
  id,
  link,
}) {
  const Tag = ({ children }) => {
    return link ? (
      <Link
        to={`/feedback/${id}`}
        className='feedback__link feedback__link--anchor'
        aria-label={`Read all details for: ${title} feedback`}
      >
        {children}
      </Link>
    ) : (
      <div className='feedback__link'>{children}</div>
    );
  };

  return (
    <article className='feedback__item'>
      <div className='feedback__description'>
        <Tag>
          <h2>{title}</h2>
          <p>{description}</p>
        </Tag>
        <ul className='nav-main__element feedback__category'>
          <Category category={category}>{category}</Category>
        </ul>
      </div>

      <Upvotes />

      <div className='feedback__comments'>
        <CommentsIcon />
        <span className='feedback__quantity'>{comments}</span>
      </div>
    </article>
  );
}

export default FeedbackItem;
