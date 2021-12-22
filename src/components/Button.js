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
    operationStartMessage,
    operationCompleteMessage,
  },
  ref
) {
  const SVGIcon = components[svgIcon];

  const buttonLoader = <span className='button__loader'>&nbsp;</span>;
  const operationStatus = (
    <span
      className='visually-hidden operation__status-message'
      aria-live='assertive'
      data-operation-start-msg={operationStartMessage}
      data-operation-finish-msg={operationCompleteMessage}
    ></span>
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
      <p className='h4 button__title' data-operation-complete='Done'>
        <span>{children}</span>
      </p>
      {operationButton ? buttonLoader : ''}
      {operationButton ? operationStatus : ''}
    </button>
  );
}

export default forwardRef(Button);
