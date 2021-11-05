import CommentsReply from './CommentsReply';

function FeedbackComments({
  name,
  username,
  image,
  comment,
  commentId,
  parentId,
  replies,
}) {
  // function test(replies) {
  //   replies.map((reply) => {
  //     return
  //   })
  // }
  return (
    <article className='comment__item'>
      <header className='comment__info'>
        <h4>{name}</h4>
        <p>{username}</p>
      </header>
      <div className='comment__author-image'>
        <img src={image[0].url} alt='' />
      </div>
      <div className='comment__content'>
        <p>{comment}</p>
      </div>
      <footer className='comment__reply-button'>Reply</footer>
      {replies.map((reply) => (
        <CommentsReply
          key={reply.fields.CommentId}
          name={reply.fields.Name}
          id={reply.fields.ParentId}
        />
      ))}
    </article>
  );
}

export default FeedbackComments;
