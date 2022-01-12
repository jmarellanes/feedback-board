import { useState, forwardRef, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

import { useUser } from '../context/UserContext';
import { operationStatus, validationMessages } from '../utils/data';
import { errorMessage } from '../utils/utils';

function CreateComment(
  {
    children,
    isReply,
    isHidden,
    feedbackId,
    commentAdded,
    replyToComment,
    closeReply,
  },
  replyRef
) {
  const MAX_CHARS = 250;

  const buttonCreateRef = useRef();
  const isCreatingComment = useRef(false);

  const [user] = useUser();
  const [characters, setCharactersLeft] = useState(MAX_CHARS);
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  watch('create-comment');
  const {
    createComment: { running, complete, failure },
  } = operationStatus;
  const { type, error } = validationMessages;

  const fieldName = { comment: 'create-comment' };

  const onSubmit = async (data) => {
    const { 'create-comment': Comment } = data;
    const { userID: Author } = user;
    const parentComment = replyToComment ? replyToComment : '';

    if (isCreatingComment.current) return;
    isCreatingComment.current = true;

    buttonCreateRef.current.setAttribute('data-operation-running', 'true');
    setStatusMessage(running);

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

        setStatusMessage(complete);
        reset({ 'create-comment': '' });
        setCharactersLeft(MAX_CHARS);

        setTimeout(() => {
          if (isReply) closeReply();
          commentAdded();
        }, 1000);
      } else {
        buttonCreateRef.current.removeAttribute('data-operation-running');
        setStatusMessage(failure);

        alert(
          "We're having trouble trying to add your new comment, please try again!'"
        );
      }

      isCreatingComment.current = false;
      if (!isReply) {
        setTimeout(() => {
          buttonCreateRef.current.removeAttribute('data-operation-complete');
        }, 1000);
      }
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
            htmlFor={fieldName.comment}
            aria-labelledby='create-comment-label'
          >
            <span id='create-comment-label' hidden>
              Add Comment
            </span>
          </label>

          <textarea
            className='form__field'
            id={fieldName.comment}
            name={fieldName.comment}
            aria-invalid={errors[fieldName.comment] ? 'true' : 'false'}
            placeholder='Type your comment here'
            maxLength={MAX_CHARS}
            {...register(fieldName.comment, {
              required: true,
              pattern: {
                value: /^(\s+\S+\s*)*(?!\s).*$/,
              },
              maxLength: MAX_CHARS,
              onChange: (e) => {
                let commentLength = e.target.value.length;
                setCharactersLeft(MAX_CHARS - commentLength);
              },
            })}
          ></textarea>
          <div className='form__group--error'>
            {
              // prettier-ignore
              errorMessage( errors, fieldName.comment, type.required, error.empty)
            }
            {
              // prettier-ignore
              errorMessage( errors, fieldName.comment, type.length, error.length)
            }
            {
              // prettier-ignore
              errorMessage( errors, fieldName.comment, type.pattern, error.space)
            }
          </div>
        </div>

        <div className='form__group create-comment__footer'>
          <p className='chars-left'>{characters} characters left</p>
          <Button
            typeAttribute='submit'
            buttonStyle='button--primary'
            ref={buttonCreateRef}
            operationButton
            statusMessage={statusMessage}
            onBlur={() => setStatusMessage('')}
          >
            {children}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default forwardRef(CreateComment);
