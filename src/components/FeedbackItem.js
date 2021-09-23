import { Link } from 'react-router-dom';

function FeedbackItem({ title, description, upvotes, category, comments, id }) {
  return (
    <Link to={`/details/${id}`}>
      <article>
        <h2>{title}</h2>
        <p>{upvotes}</p>
        <p>{description}</p>
        <p>{category}</p>
        <p>{comments}</p>
      </article>
    </Link>
  );
}

export default FeedbackItem;
