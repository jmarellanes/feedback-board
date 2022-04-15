import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';
import Button from './Button';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { ReactComponent as EditFeedbackIcon } from '../assets/images/edit-feedback.svg';

import {
  categoryOptions,
  statusOptions,
  operationStatus,
  validationMessages,
} from '../utils/data';
import { errorMessage } from '../utils/utils';

function EditFeedback({
  onClick: closeModal,
  title,
  category,
  status,
  comment,
  id,
  feedbackUpdated,
  feedbackComments,
}) {
  const MAX_CHARS = 250;
  const charsLeft = MAX_CHARS - comment.length;

  const buttonUpdateRef = useRef();
  const buttonDeleteRef = useRef();
  const isUpdatingFeedback = useRef(false);

  const history = useHistory();
  const [characters, setCharactersLeft] = useState(charsLeft);
  const [statusEditMessage, setStatusEditMessage] = useState('');
  const [statusDeleteMessage, setStatusDeleteMessage] = useState('');

  const fieldName = {
    title: 'edit-feedback-title',
    category: 'edit-feedback-category',
    status: 'edit-feedback-status',
    detail: 'edit-feedback-detail',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
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

  const { edit, destroy } = operationStatus;
  const { type, error } = validationMessages;

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <Arrow label='Arrow' />
      </components.DropdownIndicator>
    );
  };

  const updateFeedback = async (data) => {
    const {
      [fieldName.title]: Title,
      [fieldName.detail]: Description,
      [fieldName.category]: { value: Category },
      [fieldName.status]: { value: Status },
    } = data;

    if (isUpdatingFeedback.current || !isDirty) return;
    isUpdatingFeedback.current = true;

    buttonUpdateRef.current.setAttribute('data-operation-running', 'true');
    buttonUpdateRef.current.parentNode.setAttribute(
      'data-operation-running',
      'true'
    );

    setStatusEditMessage(edit.running);

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
        buttonUpdateRef.current.removeAttribute('data-operation-running');
        setStatusEditMessage(edit.complete);

        setTimeout(() => {
          feedbackUpdated();
        }, 700);
      } else {
        isUpdatingFeedback.current = false;

        buttonUpdateRef.current.removeAttribute('data-operation-running');
        buttonUpdateRef.current.parentNode.removeAttribute(
          'data-operation-running'
        );
        setStatusEditMessage(edit.error);

        alert("We're having problems, please try again!'");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFeedback = async (e) => {
    if (isUpdatingFeedback.current) return;
    isUpdatingFeedback.current = true;

    buttonDeleteRef.current.setAttribute('data-operation-running', 'true');
    buttonDeleteRef.current.parentNode.setAttribute(
      'data-operation-running',
      'true'
    );
    setStatusDeleteMessage(destroy.running);

    const comments =
      feedbackComments.length === 0
        ? 'No Comments'
        : feedbackComments.map((comment) => comment.fields.CommentID);

    try {
      const res = await fetch('/api/deleteFeedback', {
        method: 'DELETE',
        body: JSON.stringify({
          id,
          comments,
        }),
      });

      if (res.status === 200) {
        buttonDeleteRef.current.setAttribute('data-operation-complete', 'true');
        buttonDeleteRef.current.removeAttribute('data-operation-running');

        setStatusDeleteMessage(destroy.complete);
      } else {
        isUpdatingFeedback.current = false;

        buttonDeleteRef.current.removeAttribute('data-operation-running');
        buttonDeleteRef.current.parentNode.removeAttribute(
          'data-operation-running'
        );
        setStatusDeleteMessage(destroy.error);

        alert("We're having problems, please try again!'");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleTransitionEnd(e) {
    if (
      e.propertyName === 'transform' &&
      e.target.className === 'h4 button__title'
    ) {
      buttonDeleteRef.current.parentNode.removeAttribute(
        'data-operation-running'
      );
      closeModal(e.target.parentNode);

      setTimeout(() => {
        if (status === 'Suggestion') {
          return history.push('/');
        } else {
          return history.push('/roadmap');
        }
      }, 300);
    }
  }

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
                  components={{ DropdownIndicator }}
                />
              )}
            />
            <div className='form__group--error'>
              {
                // prettier-ignore
                errorMessage( errors, fieldName.status, type.required, error.empty)
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
                  setValue(e.target.value);
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

      <footer className='feedback-modal__footer feedback-modal__footer--edit'>
        <Button
          typeAttribute='submit'
          buttonStyle='button--primary'
          form='edit-feedback'
          ref={buttonUpdateRef}
          operationButton
          statusMessage={statusEditMessage}
        >
          Update Feedback
        </Button>
        <Button
          typeAttribute='button'
          buttonStyle='button--tertiary'
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          typeAttribute='button'
          buttonStyle='button--danger'
          onClick={deleteFeedback}
          ref={buttonDeleteRef}
          operationButton
          statusMessage={statusDeleteMessage}
          onTransitionEnd={handleTransitionEnd}
        >
          Delete
        </Button>
      </footer>
    </section>
  );

  return <>{modalContent}</>;
}

export default EditFeedback;
