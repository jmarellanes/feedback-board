import { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import CreateComment from './CreateComment';

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

  const [isHidden, setIsHidden] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(true);

  const commentRef = useRef();
  const replyRef = useRef();

  const getHeight = (comment, reply) => {
    const collapsedCommentHeight = comment.scrollHeight;
    comment.style.setProperty('--closeCommentHeight', collapsedCommentHeight);

    const replyFormHeight = reply.scrollHeight;
    // 16 = 1rem from Grid Gap
    let totalHeight = collapsedCommentHeight + replyFormHeight + 16;
    comment.style.setProperty('--openCommentHeight', totalHeight);

    setTriggerAnimation(!triggerAnimation);
  };

  useEffect(() => {
    getHeight(commentRef.current, replyRef.current);
    const timer = setTimeout(() => setIsHidden(!isHidden), 600);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    setTriggerAnimation((triggerAnimation) => !triggerAnimation);
  }, [isOpen]);

  return (
    <article
      className={`feedback-comment ${
        replyComment ? 'feedback-comment--reply' : ''
      }`}
    >
      <div
        ref={commentRef}
        className={`feedback-comment__container ${isOpen ? 'isOpen' : ''}`}
      >
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
        <footer className='feedback-comment__reply-button'>
          <Button
            typeAttribute='button'
            buttonStyle='button--back-light'
            onClick={() => setIsOpen(!isOpen)}
          >
            Reply
          </Button>
        </footer>
        <CSSTransition
          in={triggerAnimation}
          unmountOnExit
          timeout={250}
          classNames='feedback-comment__reply'
        >
          <CreateComment isReply={true} ref={replyRef} isHidden={isHidden}>
            Post Reply
          </CreateComment>
        </CSSTransition>
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
          parentUsername={reply.fields.ParentId === commentId ? username : null}
          replyComment={true}
        />
      ))}
    </article>
  );
}

export default FeedbackComments;
