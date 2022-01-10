import { useState, forwardRef, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

import { useUser } from '../context/UserContext';

function CreateComment(
  { children, isReply, isHidden, feedbackId, commentAdded, replyToComment },
  replyRef
) {
  const MAX_CHARS = 250;

  const buttonCreateRef = useRef();
  const isCreatingComment = useRef(false);

  const [user] = useUser();

  const [characters, setCharactersLeft] = useState(MAX_CHARS);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  watch('create-comment');

  const onSubmit = async (data) => {
    const { 'create-comment': Comment } = data;
    const { userID: Author } = user;
    const parentComment = replyToComment ? replyToComment : '';

    if (isCreatingComment.current) return;
    isCreatingComment.current = true;

    buttonCreateRef.current.setAttribute('data-operation-running', 'true');

    try {
      const res = await fetch('/api/createComment/', {
        method: 'POST',
        body: JSON.stringify({
          Comment,
          Feedback: [feedbackId],
          Author: [Author],
          ParentId: parentComment,
        }),
      });

      if (res.status === 200) {
        buttonCreateRef.current.setAttribute('data-operation-complete', 'true');
        buttonCreateRef.current.removeAttribute('data-operation-running');

        commentAdded();
        reset({ 'create-comment': '' });
      } else {
        buttonCreateRef.current.removeAttribute('data-operation-running');

        alert(
          "We're having trouble trying to add your new comment, please try again!'"
        );
      }

      isCreatingComment.current = false;
      setTimeout(() => {
        buttonCreateRef.current.removeAttribute('data-operation-complete');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`create-comment__container ${
        isReply ? 'feedback-comment__reply' : ''
      } ${isHidden ? 'get-size-hidden' : ''}`}
      ref={replyRef}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form__group'>
          <label
            htmlFor='create-comment'
            aria-labelledby='create-comment-label'
          >
            <span id='create-comment-label' hidden>
              Add Comment
            </span>
          </label>

          <textarea
            className='form__field'
            id='create-comment'
            name='create-comment'
            aria-invalid={errors['create-comment'] ? 'true' : 'false'}
            placeholder='Type your comment here'
            maxLength={MAX_CHARS}
            {...register('create-comment', {
              required: true,
              maxLength: MAX_CHARS,
              onChange: (e) => {
                let commentLength = e.target.value.length;
                setCharactersLeft(MAX_CHARS - commentLength);
              },
            })}
          ></textarea>
          <div className='form__group--error'>
            {errors['create-comment'] &&
              errors['create-comment']?.type === 'required' && (
                <span role='alert'>Can't be empty.</span>
              )}
            {errors['create-comment'] &&
              errors['create-comment'].type === 'maxLength' && (
                <span role='alert'>Max length exceeded.</span>
              )}
          </div>
        </div>

        <div className='form__group create-comment__footer'>
          <p className='chars-left'>{characters} characters left</p>
          <Button
            typeAttribute='submit'
            buttonStyle='button--primary'
            ref={buttonCreateRef}
            operationButton
          >
            {children}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default forwardRef(CreateComment);
