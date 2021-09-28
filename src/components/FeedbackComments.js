function FeedbackComments({ name, username, image, comment }) {
  return (
    <article>
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
    </article>
  );
}

export default FeedbackComments;
