import { forwardRef } from 'react';

import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';
import { ReactComponent as Sign } from '../assets/images/plus-sign.svg';

// Render a different component based on a prop.
// https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime

const components = {
  'chevron-left': ChevronLeft,
  sign: Sign,
};

function Button(
  {
    children,
    buttonStyle,
    typeAttribute,
    onClick,
    svgIcon,
    form,
    operationButton,
    statusMessage,
  },
  ref
) {
  const SVGIcon = components[svgIcon];

  const buttonLoader = <span className='button__loader'></span>;
  const operationStatus = (
    <span
      className='visually-hidden operation__status-message'
      aria-live='assertive'
    >
      {statusMessage}
    </span>
  );

  return (
    <button
      type={typeAttribute}
      className={`button ${buttonStyle || ''}`}
      onClick={onClick}
      form={form}
      ref={ref}
    >
      {svgIcon ? (
        <span className='button__icon'>
          <SVGIcon />
        </span>
      ) : null}
      <span className='h4 button__title' data-operation-complete='Done'>
        <span className='button__subtitle'>{children}</span>
      </span>
      {operationButton ? buttonLoader : ''}
      {operationButton ? operationStatus : ''}
    </button>
  );
}

export default forwardRef(Button);
