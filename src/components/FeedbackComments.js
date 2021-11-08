function FeedbackComments({
  allComments,
  name,
  username,
  image,
  comment,
  commentId,
  replyComment,
}) {
  let replyCommentsList = () =>
    allComments.filter((c) => c.fields.ParentId === commentId);

  return (
    <>
      <article
        className={`feedback-comment ${
          replyComment ? 'feedback-comment--reply' : ''
        }`}
      >
        <div className='feedback-comment__container'>
          <header className='feedback-comment__info'>
            <h4>{name}</h4>
            <p>{username}</p>
          </header>
          <div className='feedback-comment__author-image'>
            <img src={image[0].url} alt={`${name}`} />
          </div>
          <div className='feedback-comment__comment'>
            <p>{comment}</p>
          </div>
          <footer className='feedback-comment__reply-button'>Reply</footer>
        </div>
        {replyCommentsList().map((reply) => (
          <FeedbackComments
            allComments={allComments}
            key={reply.fields.CommentId}
            commentId={reply.fields.CommentId}
            name={reply.fields.Name}
            username={reply.fields.Username}
            image={reply.fields.Image}
            comment={reply.fields.Comment}
            replyComment={true}
          />
        ))}
      </article>
    </>
  );
}

export default FeedbackComments;
