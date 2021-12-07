import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as CreateFeedbackIcon } from '../assets/images/create-feedback.svg';

function EditFeedback({ onClick, title, category, status, comment }) {
  const MAX_CHARS = 250;
  const charsLeft = MAX_CHARS - comment.length;
  const [characters, setCharactersLeft] = useState(charsLeft);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      'create-feedback-title': title,
      'create-feedback-detail': comment,
      'create-feedback-category': { label: category, value: category },
      'create-feedback-status': { label: status, value: status },
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Arrow label='Arrow' />
      </components.DropdownIndicator>
    );
  };

  const categoryOptions = [
    {
      label: 'Feature',
      value: 'Feature',
    },
    {
      label: 'Enhancement',
      value: 'Enhancement',
    },
    {
      label: 'Bug',
      value: 'Bug',
    },
  ];

  const statusOptions = [
    {
      label: 'Suggestion',
      value: 'Suggestion',
    },
    {
      label: 'Planned',
      value: 'Planned',
    },
    {
      label: 'In-Progress',
      value: 'In-Progress',
    },
    {
      label: 'Live',
      value: 'Live',
    },
  ];

  const onSubmit = async (data) => {
    console.log(data);
  };

  const modalInterior = (
    <section className='create-feedback'>
      <span className='create-feedback__icon'>
        <CreateFeedbackIcon />
      </span>
      <h2 className='create-feedback__title h1' id='dialog-title'>
        Editing '{title}'
      </h2>
      <p id='dialog-description' className='visually-hidden'>
        This is a dialog window which overlays the main content of the page. The
        modal begins with a heading 2 called &quot;Create New Feedback&quot;.
        Pressing the Cancel button at the bottom of the modal or pressing Escape
        will close the modal and bring you back to where you were on the page.
      </p>

      <div className='create-feedback__container'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form__group'>
            <label htmlFor='create-feedback-title' className='h4'>
              Feedback Title
            </label>
            <p className='form__group-subtitle'>
              Add a short, descriptive headline
            </p>

            <input
              type='text'
              className='form__field'
              id='create-feedback-title'
              name='create-feedback-title'
              aria-invalid={errors['create-feedback-title'] ? 'true' : 'false'}
              {...register('create-feedback-title', {
                required: true,
                onChange: (e) => {
                  setValue(e.target.value);
                },
              })}
            />
            <div className='form__group--error'>
              {errors['create-feedback-title'] &&
                errors['create-feedback-title']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='create-feedback-category' className='h4'>
              Category
            </label>
            <p className='form__group-subtitle'>
              Choose a category for your feedback
            </p>

            <Controller
              name='create-feedback-category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  aria-invalid={
                    errors['create-feedback-category'] ? 'true' : 'false'
                  }
                  name='create-feedback-category'
                  inputId='create-feedback-category'
                  classNamePrefix='select'
                  className={`form__field ${
                    errors['create-feedback-category']
                      ? 'aria-invalid-true'
                      : ''
                  }`}
                  openMenuOnFocus
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {errors['create-feedback-category'] &&
                errors['create-feedback-category']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='create-feedback-status' className='h4'>
              Update Status
            </label>
            <p className='form__group-subtitle'>Change feedback state</p>

            <Controller
              name='create-feedback-status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  aria-invalid={
                    errors['create-feedback-status'] ? 'true' : 'false'
                  }
                  name='create-feedback-status'
                  inputId='create-feedback-status'
                  classNamePrefix='select'
                  className={`form__field ${
                    errors['create-feedback-status'] ? 'aria-invalid-true' : ''
                  }`}
                  openMenuOnFocus
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {errors['create-feedback-status'] &&
                errors['create-feedback-status']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='create-feedback-detail' className='h4 '>
              Feedback Detail
            </label>
            <p className='form__group-subtitle'>
              Include any specific comments on what should be improved, added,
              etc.
            </p>

            <textarea
              className='form__field'
              id='create-feedback-detail'
              name='create-feedback-detail'
              aria-invalid={errors['create-feedback-detail'] ? 'true' : 'false'}
              maxLength={MAX_CHARS}
              {...register('create-feedback-detail', {
                required: true,
                maxLength: MAX_CHARS,
                onChange: (e) => {
                  let commentLength = e.target.value.length;
                  setCharactersLeft(MAX_CHARS - commentLength);
                  setValue(e.target.value);
                },
              })}
            ></textarea>
            <div className='form__group--error'>
              {errors['create-feedback-detail'] &&
                errors['create-feedback-detail']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
              {errors['create-feedback-detail'] &&
                errors['create-feedback-detail'].type === 'maxLength' && (
                  <span role='alert'>Max length exceeded.</span>
                )}
            </div>
            <p className='create-feedback__chars-left left-ch'>
              {characters} characters left
            </p>
          </div>

          <div className='form__group create-feedback__footer'>
            <Button
              typeAttribute='button'
              buttonStyle='button--tertiary'
              onClick={onClick}
            >
              Cancel
            </Button>
            <Button typeAttribute='submit' buttonStyle='button--primary'>
              Update Feedback
            </Button>
          </div>
        </form>
      </div>
    </section>
  );

  return <>{modalInterior}</>;
}

export default EditFeedback;
