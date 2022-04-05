import { Link } from 'react-router-dom';
import Category from './Category';
import { ReactComponent as CommentsIcon } from '../assets/images/comments.svg';
import Upvotes from './Upvotes';

function FeedbackItem({
  title,
  description,
  category,
  comments,
  id,
  link,
  categoryActive,
  roadmapFeedback,
  status,
  upvotedBy,
  totalUpvotes,
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
            <h3 className='feedback-item__heading h2'>{title}</h3>
            <p className='feedback-item__paragraph'>{description}</p>
          </Tag>
        </header>

        <div className='feedback-item__upvotes'>
          <Upvotes
            upvotedBy={upvotedBy}
            id={id}
            totalUpvotesFromParent={totalUpvotes}
          />
        </div>

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
