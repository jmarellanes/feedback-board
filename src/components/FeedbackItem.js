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
        className='feedback-item__link feedback-item__link--anchor'
        aria-label={`Read all details for: ${title} feedback`}
      >
        {children}
      </Link>
    ) : (
      <div className='feedback-item__link'>{children}</div>
    );
  };

  return (
    <article className='feedback-item'>
      <div className='feedback-item__description'>
        <Tag>
          <h2>{title}</h2>
          <p>{description}</p>
        </Tag>
        <ul className='nav-main__element feedback-item__category'>
          <Category category={category}>{category}</Category>
        </ul>
      </div>

      <Upvotes feedbackItemClass='feedback-item__upvotes' />

      <div className='feedback-item__quantity'>
        <CommentsIcon />
        <span>{comments}</span>
      </div>
    </article>
  );
}

export default FeedbackItem;
