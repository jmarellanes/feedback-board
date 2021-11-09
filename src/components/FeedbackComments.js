function FeedbackComments({
  allComments,
  name,
  username,
  image,
  comment,
  commentId,
  parentUsername,
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
            <h4 className='feedback-comment__name'>{name}</h4>
            <p className='feedback-comment__username'>{`@${username}`}</p>
          </header>
          <div className='feedback-comment__author-image'>
            <img src={image[0].url} alt={`${name}`} />
          </div>
          <div className='feedback-comment__comment'>
            <p>
              {parentUsername ? (
                <span className='feedback-comment__replyTo'>
                  @{parentUsername}
                </span>
              ) : null}{' '}
              {comment}
            </p>
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
            parentId={reply.fields.ParentId}
            parentUsername={
              reply.fields.ParentId === commentId ? username : null
            }
            replyComment={true}
          />
        ))}
      </article>
    </>
  );
}

export default FeedbackComments;
