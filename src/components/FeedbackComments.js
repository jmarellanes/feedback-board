function FeedbackComments({
  allComments,
  name,
  username,
  image,
  comment,
  commentId,
  replyComment,
}) {
  let replyComments = () =>
    allComments.filter((c) => c.fields.ParentId === commentId);

  return (
    <>
      <article
        className={`feedback-comment ${
          replyComment ? 'feedback-comment--reply' : ''
        }`}
      >
        <header className='feedback-comment__info'>
          <h4>{name}</h4>
          <p>{username}</p>
        </header>
        <div className='feedback-comment__author-image'>
          <img src={image[0].url} alt='' />
        </div>
        <div className='feedback-comment__content'>
          <p>{comment}</p>
        </div>
        <footer className='feedback-comment__reply-button'>Reply</footer>
        {replyComments().map((c) => (
          <FeedbackComments
            allComments={allComments}
            key={c.fields.CommentId}
            commentId={c.fields.CommentId}
            name={c.fields.Name}
            username={c.fields.Username}
            image={c.fields.Image}
            comment={c.fields.Comment}
            replyComment={true}
          />
        ))}
      </article>
    </>
  );
}

export default FeedbackComments;
