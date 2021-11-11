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
    <form onSubmit={handleSubmit(onSubmit)} id='myForm'>
      <div className='form__group form__group--textarea'>
        <label htmlFor='create-comment' className='h2'>
          Add Comment
        </label>
        <span className='form__container-field'>
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
          {errors['create-comment'] &&
            errors['create-comment']?.type === 'required' && (
              <span role='alert'>Comment is required</span>
            )}
          {errors['create-comment'] &&
            errors['create-comment'].type === 'maxLength' && (
              <span role='alert'>Max length exceeded</span>
            )}
        </span>
      </div>

      <div className='form__group'>
        <Button typeAttribute='submit' buttonStyle='button--primary'>
          Post Comment
        </Button>
      </div>
      <p>{characters} characters left</p>
    </form>
  );
}

export default CreateComment;
