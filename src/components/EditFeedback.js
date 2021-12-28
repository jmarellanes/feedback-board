import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as EditFeedbackIcon } from '../assets/images/edit-feedback.svg';

import { categoryOptions, statusOptions } from '../utils/data';

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

  const buttonUpdateRef = useRef();
  const buttonDeleteRef = useRef();
  const isUpdatingFeedback = useRef(false);

  const history = useHistory();
  const [characters, setCharactersLeft] = useState(charsLeft);

  const fieldName = {
    title: 'edit-feedback-title',
    category: 'edit-feedback-category',
    status: 'edit-feedback-status',
    detail: 'edit-feedback-detail',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      [fieldName.title]: title,
      [fieldName.detail]: comment,
      [fieldName.category]: { label: category, value: category },
      [fieldName.status]: { label: status, value: status },
    },
  });

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Arrow label='Arrow' />
      </components.DropdownIndicator>
    );
  };

  const updateFeedback = async (data) => {
    const {
      'edit-feedback-title': Title,
      'edit-feedback-detail': Description,
      'edit-feedback-category': { value: Category },
      'edit-feedback-status': { value: Status },
    } = data;

    if (isUpdatingFeedback.current) return;
    isUpdatingFeedback.current = true;

    buttonUpdateRef.current.setAttribute('data-loader', 'true');
    buttonUpdateRef.current.parentNode.setAttribute('data-loader', 'true');
    // Explicit set the button loading action for screen readers
    const operationStatus = buttonUpdateRef.current.querySelector(
      '.operation__status-message'
    );
    operationStatus.innerText = operationStatus.getAttribute(
      'data-operation-start-msg'
    );

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
        buttonUpdateRef.current.setAttribute('data-operation-complete', 'true');
        buttonUpdateRef.current.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-finish-msg'
        );

        setTimeout(() => {
          feedbackUpdated();
        }, 700);
      } else {
        isUpdatingFeedback.current = false;

        buttonUpdateRef.current.removeAttribute('data-loader');
        buttonUpdateRef.current.parentNode.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-error'
        );

        alert("We're having problems, please try again!'");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedback = async (e) => {
    if (isUpdatingFeedback.current) return;
    isUpdatingFeedback.current = true;

    buttonDeleteRef.current.setAttribute('data-loader', 'true');
    buttonDeleteRef.current.parentNode.setAttribute('data-loader', 'true');
    // Explicit set the button loading action for screen readers
    const operationStatus = buttonDeleteRef.current.querySelector(
      '.operation__status-message'
    );
    operationStatus.innerText = operationStatus.getAttribute(
      'data-operation-start-msg'
    );

    try {
      const res = await fetch('/api/deleteFeedback', {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        }),
      });

      if (res.status === 200) {
        buttonDeleteRef.current.setAttribute('data-operation-complete', 'true');
        buttonDeleteRef.current.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-finish-msg'
        );

        console.log(e);
        closeModal(e);
        setTimeout(() => {
          history.push('/');
        }, 5000);
      } else {
        isUpdatingFeedback.current = false;

        buttonDeleteRef.current.removeAttribute('data-loader');
        buttonDeleteRef.current.parentNode.removeAttribute('data-loader');
        operationStatus.innerText = operationStatus.getAttribute(
          'data-operation-error'
        );
        alert("We're having problems, please try again!'");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modalContent = (
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
        <form onSubmit={handleSubmit(updateFeedback)} id='edit-feedback'>
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
              {errors['edit-feedback-title'] &&
                errors['edit-feedback-title']?.type === 'pattern' && (
                  <span role='alert'>
                    Entered value can't start or contain only white spacing.
                  </span>
                )}
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
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
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
              {errors['edit-feedback-category'] &&
                errors['edit-feedback-category']?.type === 'required' && (
                  <span role='alert'>Can't be empty.</span>
                )}
            </div>
          </div>

          <div className='form__group'>
            <label htmlFor={fieldName.status} className='h4'>
              Update Status
            </label>
            <p className='form__group-subtitle'>Change feedback state</p>

            <Controller
              name={fieldName.status}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={statusOptions}
                  aria-invalid={errors[fieldName.status] ? 'true' : 'false'}
                  name={fieldName.status}
                  inputId={fieldName.status}
                  classNamePrefix='select'
                  className={`form__field ${
                    errors[fieldName.status] ? 'aria-invalid-true' : ''
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
              {errors['edit-feedback-detail'] &&
                errors['edit-feedback-detail']?.type === 'pattern' && (
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
          buttonStyle='button--danger'
          onClick={(e) => deleteFeedback(e)}
          ref={buttonDeleteRef}
          operationButton
          operationStartMessage='Deleting feedback, please wait...'
          operationCompleteMessage='Feedback delete successful'
          operationError='We are having trouble deleting your feedback, please try again!'
        >
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
          ref={buttonUpdateRef}
          operationButton
          operationStartMessage='Updating feedback, please wait...'
          operationCompleteMessage='Feedback update successful'
          operationError='We are having trouble updating your feedback, please try again!'
        >
          Update Feedback
        </Button>
      </footer>
    </section>
  );

  return <>{modalContent}</>;
}

export default EditFeedback;
