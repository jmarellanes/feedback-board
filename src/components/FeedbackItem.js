import { Link } from 'react-router-dom';
import Category from './Category';
import { ReactComponent as CommentsIcon } from '../assets/images/comments.svg';

function FeedbackItem({
  title,
  description,
  category,
  comments,
  id,
  link,
  categoryActive,
  children,
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
      <div className='feedback-item__container'>
        <header className='feedback-item__title'>
          <Tag>
            <h2>{title}</h2>
            <p>{description}</p>
          </Tag>
        </header>

        <div className='feedback-item__upvotes'>{children}</div>

        <div className='feedback-item__comments'>
          <CommentsIcon />
          <span>{comments}</span>
        </div>

        <footer className='feedback-item__category'>
          <ul className='nav-main__element'>
            <Category category={category} isActive={categoryActive}>
              {category}
            </Category>
          </ul>
        </footer>
      </div>
    </article>
  );
}

export default FeedbackItem;
