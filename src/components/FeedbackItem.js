function FeedbackItem({ title, description, upvotes, category, comments }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{upvotes}</p>
      <p>{description}</p>
      <p>{category}</p>
      <p>{comments}</p>
    </article>
  );
}

export default FeedbackItem;
