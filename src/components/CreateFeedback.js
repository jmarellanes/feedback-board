import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as CreateFeedbackIcon } from '../assets/images/create-feedback.svg';

import { useUser } from '../context/UserContext';

function CreateFeedback({ onClick, feedbackAdded }) {
  const MAX_CHARS = 250;
  const [user] = useUser();
  const [characters, setCharactersLeft] = useState(MAX_CHARS);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const buttonSubmitRef = useRef();
  const buttonCancelRef = useRef();
  const isCreatingFeedback = useRef(false);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Arrow label='Arrow' />
      </components.DropdownIndicator>
    );
  };

  const options = [
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

  const onSubmit = async (data) => {
    const {
      'create-feedback-title': Title,
      'create-feedback-detail': Description,
      'create-feedback-category': { value: Category },
    } = data;
    const { id: Author } = user;

    if (isCreatingFeedback.current) return;

    isCreatingFeedback.current = true;
    buttonSubmitRef.current.parentNode.setAttribute('data-loader', 'true');

    buttonSubmitRef.current.setAttribute('data-loader', 'true');
    // Explicit set the action for screen readers
    const operationStatus = buttonSubmitRef.current.querySelector(
      '.operation__status-message'
    );
    operationStatus.innerText = operationStatus.getAttribute(
      'data-operation-start-msg'
    );

    try {
      const res = await fetch('/api/createFeedback/', {
        method: 'POST',
        body: JSON.stringify({
          Title,
          Description,
          Category,
          Author: [Author],
        }),
      });

      if (res.status === 200) {
        buttonSubmitRef.current.setAttribute('data-operation-complete', 'true');
        buttonSubmitRef.current.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-finish-msg'
        );

        feedbackAdded();
      } else {
        isCreatingFeedback.current = false;

        buttonSubmitRef.current.removeAttribute('data-loader');
        buttonSubmitRef.current.parentNode.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-error'
        );

        alert(
          "We're having trouble trying to add your new feedback, please try again!'"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalInterior = (
    <section className='feedback-modal'>
      <header className='feedback-modal__header'>
        <span className='feedback-modal__icon'>
          <CreateFeedbackIcon />
        </span>
        <h2 className='feedback-modal__title h1' id='dialog-title'>
          Create New Feedback
        </h2>
        <p id='dialog-description' className='visually-hidden'>
          This is a dialog window which overlays the main content of the page.
          The modal begins with a heading 2 called &quot;Create New
          Feedback&quot;. Pressing the Cancel button at the bottom of the modal
          or pressing Escape will close the modal and bring you back to where
          you were on the page.
        </p>
      </header>

      <div className='feedback-modal__container'>
        <form onSubmit={handleSubmit(onSubmit)} id='create-feedback'>
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
                pattern: {
                  value: /^(\s+\S+\s*)*(?!\s).*$/,
                },
              })}
            />
            <div className='form__group--error'>
              {errors['create-feedback-title'] &&
                errors['create-feedback-title']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
              {errors['create-feedback-title'] &&
                errors['create-feedback-title']?.type === 'pattern' && (
                  <span role='alert'>
                    Entered value can't start or contain only white spacing.
                  </span>
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
              aria-invalid='true'
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  default-value={{
                    label: 'Feature',
                    value: 'Feature',
                  }}
                  {...field}
                  placeholder='Feature'
                  options={options}
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
              {errors['create-feedback-detail'] &&
                errors['create-feedback-detail']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
              {errors['create-feedback-detail'] &&
                errors['create-feedback-detail'].type === 'maxLength' && (
                  <span role='alert'>Max length exceeded.</span>
                )}
              {errors['create-feedback-detail'] &&
                errors['create-feedback-detail']?.type === 'pattern' && (
                  <span role='alert'>
                    Entered value can't start or contain only white spacing.
                  </span>
                )}
            </div>
            <p className='feedback-modal__chars-left chars-left'>
              {characters} characters left
            </p>
          </div>
        </form>
      </div>

      <footer className='feedback-modal__footer'>
        <Button
          typeAttribute='button'
          buttonStyle='button--tertiary'
          onClick={onClick}
          ref={buttonCancelRef}
        >
          Cancel
        </Button>
        <Button
          typeAttribute='submit'
          buttonStyle='button--primary'
          form='create-feedback'
          ref={buttonSubmitRef}
          operationButton
          operationStartMessage='Adding new feedback, please wait...'
          operationCompleteMessage='New feedback added succesfully'
          operationError='We are having trouble trying to add your new feedback, please try again!'
        >
          Add Feedback
        </Button>
      </footer>
    </section>
  );

  return <>{modalInterior}</>;
}

export default CreateFeedback;
