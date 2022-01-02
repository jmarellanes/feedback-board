import { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as CreateFeedbackIcon } from '../assets/images/create-feedback.svg';

import { useUser } from '../context/UserContext';
import {
  categoryOptions,
  operationStatus,
  validationMessages,
} from '../utils/data';
import { errorMessage } from '../utils/utils';

function CreateFeedback({ onClick, feedbackAdded }) {
  const MAX_CHARS = 250;

  const buttonSubmitRef = useRef();
  const buttonCancelRef = useRef();
  const isCreatingFeedback = useRef(false);

  const [user] = useUser();
  const [characters, setCharactersLeft] = useState(MAX_CHARS);
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const {
    create: { running, complete, failure },
  } = operationStatus;
  const { type, error } = validationMessages;

  const fieldName = {
    title: 'create-feedback-title',
    category: 'create-feedback-category',
    detail: 'create-feedback-detail',
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Arrow label='Arrow' />
      </components.DropdownIndicator>
    );
  };

  const onSubmit = async (data) => {
    const {
      'create-feedback-title': Title,
      'create-feedback-detail': Description,
      'create-feedback-category': { value: Category },
    } = data;
    const { userID: Author } = user;

    if (isCreatingFeedback.current) return;
    isCreatingFeedback.current = true;

    buttonSubmitRef.current.parentNode.setAttribute(
      'data-operation-running',
      'true'
    );
    buttonSubmitRef.current.setAttribute('data-operation-running', 'true');

    setStatusMessage(running);

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
        buttonSubmitRef.current.removeAttribute('data-operation-running');
        setStatusMessage(complete);

        feedbackAdded();
      } else {
        isCreatingFeedback.current = false;

        buttonSubmitRef.current.removeAttribute('data-operation-running');
        buttonSubmitRef.current.parentNode.removeAttribute(
          'data-operation-running'
        );
        setStatusMessage(failure);

        alert(
          "We're having trouble trying to add your new feedback, please try again!'"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalContent = (
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
            <label htmlFor={fieldName.title} className='h4'>
              Feedback Title
            </label>
            <p className='form__group-subtitle'>
              Add a short, descriptive headline
            </p>

            <input
              type='text'
              className='form__field'
              id={fieldName.title}
              name={fieldName.title}
              aria-invalid={errors[fieldName.title] ? 'true' : 'false'}
              {...register(fieldName.title, {
                required: true,
                pattern: {
                  value: /^(\s+\S+\s*)*(?!\s).*$/,
                },
              })}
            />
            <div className='form__group--error'>
              {
                // prettier-ignore
                errorMessage( errors, fieldName.title, type.required, error.empty)
              }
              {
                // prettier-ignore
                errorMessage( errors, fieldName.title, type.pattern, error.space)
              }
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor={fieldName.category} className='h4'>
              Category
            </label>
            <p className='form__group-subtitle'>
              Choose a category for your feedback
            </p>

            <Controller
              name={fieldName.category}
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
                  options={categoryOptions}
                  aria-invalid={errors[fieldName.category] ? 'true' : 'false'}
                  name={fieldName.category}
                  inputId={fieldName.category}
                  classNamePrefix='select'
                  className={`form__field ${
                    errors[fieldName.category] ? 'aria-invalid-true' : ''
                  }`}
                  openMenuOnFocus
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {
                // prettier-ignore
                errorMessage( errors, fieldName.category, type.required, error.empty)
              }
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor={fieldName.detail} className='h4 '>
              Feedback Detail
            </label>
            <p className='form__group-subtitle'>
              Include any specific comments on what should be improved, added,
              etc.
            </p>

            <textarea
              className='form__field'
              id={fieldName.detail}
              name={fieldName.detail}
              aria-invalid={errors[fieldName.detail] ? 'true' : 'false'}
              maxLength={MAX_CHARS}
              {...register(fieldName.detail, {
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
                errorMessage( errors, fieldName.detail, type.required, error.empty)
              }
              {
                // prettier-ignore
                errorMessage( errors, fieldName.detail, type.length, error.length)
              }
              {
                // prettier-ignore
                errorMessage( errors, fieldName.detail, type.pattern, error.space)
              }
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
          statusMessage={statusMessage}
        >
          Add Feedback
        </Button>
      </footer>
    </section>
  );

  return <>{modalContent}</>;
}

export default CreateFeedback;
