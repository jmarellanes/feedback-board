import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

function CreateComment() {
  const MAX_CHARS = 250;
  const [characters, setCharactersLeft] = useState(MAX_CHARS);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  watch('create-comment');

  const onSubmit = (data) => {
    // Call to API
    console.log(data);
  };
  return (
    <div className='create-comment__container'>
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
                <span role='alert'>Can't be empty. Comment is required</span>
              )}
            {errors['create-comment'] &&
              errors['create-comment'].type === 'maxLength' && (
                <span role='alert'>Max length exceeded</span>
              )}
          </div>
        </div>

        <div className='form__group create-comment__footer'>
          <p>{characters} characters left</p>
          <Button typeAttribute='submit' buttonStyle='button--primary'>
            Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateComment;
