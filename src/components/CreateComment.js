import { useState, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

import { useUser } from '../context/UserContext';

function CreateComment(
  { children, isReply, isHidden, id, commentAdded },
  replyRef
) {
  const [user] = useUser();

  const MAX_CHARS = 250;
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
    const { id: Author } = user;

    try {
      const res = await fetch('/api/createComment/', {
        method: 'POST',
        body: JSON.stringify({
          Comment,
          Feedback: [id],
          Author: [Author],
        }),
      });

      if (res.status === 200) {
        commentAdded();
        reset({ 'create-comment': '' });
      } else {
        alert(
          "We're having trouble trying to add your new comment, please try again!'"
        );
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
          <Button typeAttribute='submit' buttonStyle='button--primary'>
            {children}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default forwardRef(CreateComment);
