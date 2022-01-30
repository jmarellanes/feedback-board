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
  roadmapFeedback,
  status,
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

  const feedbackStatus = (
    <div className='roadmap-card__item'>
      <span className={`roadmap-card__name roadmap-card__name--${status}`}>
        {status}
      </span>
    </div>
  );

  return (
    <article className='feedback-item'>
      {roadmapFeedback ? feedbackStatus : null}
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
