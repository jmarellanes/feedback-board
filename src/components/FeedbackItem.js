import Category from './Category';
import Upvotes from './Upvotes';
import { ReactComponent as CommentsIcon } from '../assets/images/comments.svg';

function FeedbackItem({ title, description, upvotes, category, comments }) {
  return (
    <article className='feedback__item'>
      <div className='feedback__description'>
        <div className='feedback__link'>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <ul className='nav-main__element feedback__category'>
          <Category>{category}</Category>
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
