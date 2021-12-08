import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as EditFeedbackIcon } from '../assets/images/edit-feedback.svg';

function EditFeedback({
  onClick: closeModal,
  title,
  category,
  status,
  comment,
  id,
  feedbackUpdated,
}) {
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
      'edit-feedback-title': title,
      'edit-feedback-detail': comment,
      'edit-feedback-category': { label: category, value: category },
      'edit-feedback-status': { label: status, value: status },
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
    const {
      'edit-feedback-title': Title,
      'edit-feedback-detail': Description,
      'edit-feedback-category': { value: Category },
      'edit-feedback-status': { value: Status },
    } = data;

    try {
      const res = await fetch('/api/updateFeedback', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          Title,
          Description,
          Category,
          Status,
        }),
      });

      if (res.status === 200) {
        feedbackUpdated();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalInterior = (
    <section className='feedback-modal'>
      <header className='feedback-modal__header'>
        <span className='feedback-modal__icon'>
          <EditFeedbackIcon />
        </span>
        <h2 className='feedback-modal__title h1' id='dialog-title'>
          Editing '{title}'
        </h2>
        <p id='dialog-description' className='visually-hidden'>
          This is a dialog window which overlays the main content of the page.
          The modal begins with a heading 2 called &quot;Editing{title}&quot;.
          Pressing the Cancel button at the bottom of the modal or pressing
          Escape will close the modal and bring you back to where you were on
          the page.
        </p>
      </header>

      <div className='feedback-modal__container'>
        <form onSubmit={handleSubmit(onSubmit)} id='edit-feedback'>
          <div className='form__group'>
            <label htmlFor='edit-feedback-title' className='h4'>
              Feedback Title
            </label>
            <p className='form__group-subtitle'>
              Add a short, descriptive headline
            </p>

            <input
              type='text'
              className='form__field'
              id='edit-feedback-title'
              name='edit-feedback-title'
              aria-invalid={errors['edit-feedback-title'] ? 'true' : 'false'}
              {...register('edit-feedback-title', {
                required: true,
                onChange: (e) => {
                  setValue(e.target.value);
                },
              })}
            />
            <div className='form__group--error'>
              {errors['edit-feedback-title'] &&
                errors['edit-feedback-title']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='edit-feedback-category' className='h4'>
              Category
            </label>
            <p className='form__group-subtitle'>
              Choose a category for your feedback
            </p>

            <Controller
              name='edit-feedback-category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  aria-invalid={
                    errors['edit-feedback-category'] ? 'true' : 'false'
                  }
                  name='edit-feedback-category'
                  inputId='edit-feedback-category'
                  classNamePrefix='select'
                  className={`form__field ${
                    errors['edit-feedback-category'] ? 'aria-invalid-true' : ''
                  }`}
                  openMenuOnFocus
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {errors['edit-feedback-category'] &&
                errors['edit-feedback-category']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='edit-feedback-status' className='h4'>
              Update Status
            </label>
            <p className='form__group-subtitle'>Change feedback state</p>

            <Controller
              name='edit-feedback-status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  aria-invalid={
                    errors['edit-feedback-status'] ? 'true' : 'false'
                  }
                  name='edit-feedback-status'
                  inputId='edit-feedback-status'
                  classNamePrefix='select'
                  className={`form__field ${
                    errors['edit-feedback-status'] ? 'aria-invalid-true' : ''
                  }`}
                  openMenuOnFocus
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {errors['edit-feedback-status'] &&
                errors['edit-feedback-status']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor='edit-feedback-detail' className='h4 '>
              Feedback Detail
            </label>
            <p className='form__group-subtitle'>
              Include any specific comments on what should be improved, added,
              etc.
            </p>

            <textarea
              className='form__field'
              id='edit-feedback-detail'
              name='edit-feedback-detail'
              aria-invalid={errors['edit-feedback-detail'] ? 'true' : 'false'}
              maxLength={MAX_CHARS}
              {...register('edit-feedback-detail', {
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
              {errors['edit-feedback-detail'] &&
                errors['edit-feedback-detail']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
              {errors['edit-feedback-detail'] &&
                errors['edit-feedback-detail'].type === 'maxLength' && (
                  <span role='alert'>Max length exceeded.</span>
                )}
            </div>
            <p className='feedback-modal__chars-left chars-left'>
              {characters} characters left
            </p>
          </div>
        </form>
      </div>

      <footer className='feedback-modal__footer'>
        <Button typeAttribute='button' buttonStyle='button--danger'>
          Delete
        </Button>
        <Button
          typeAttribute='button'
          buttonStyle='button--tertiary'
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          typeAttribute='submit'
          buttonStyle='button--primary'
          form='edit-feedback'
        >
          Update Feedback
        </Button>
      </footer>
    </section>
  );

  return <>{modalInterior}</>;
}

export default EditFeedback;
