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
    dataLoadingMessage,
    dataAddedFeedback,
  },
  buttonSubmitRef
) {
  const SVGIcon = components[svgIcon];

  return (
    <button
      type={typeAttribute}
      className={`button ${buttonStyle || ''}`}
      onClick={onClick}
      form={form}
      ref={buttonSubmitRef}
    >
      {svgIcon ? (
        <span className='button__icon'>
          <SVGIcon />
        </span>
      ) : null}
      <p className='h4 button__title' data-added='Done'>
        <span>{children}</span>
      </p>
      <span className='button__loader'>&nbsp;</span>
      <span
        className='visually-hidden js__loadingMessage'
        aria-live='assertive'
        data-loading-msg={dataLoadingMessage}
        data-added-feedback={dataAddedFeedback}
      ></span>
    </button>
  );
}

export default forwardRef(Button);
