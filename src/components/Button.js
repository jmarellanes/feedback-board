import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';
import { ReactComponent as Sign } from '../assets/images/plus-sign.svg';

// Render a different component based on a prop.
// https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime

const components = {
  'chevron-left': ChevronLeft,
  sign: Sign,
};

function Button({ children, buttonStyle, typeAttribute, onClick, svgIcon }) {
  const SVGIcon = components[svgIcon];

  return (
    <button
      type={typeAttribute}
      className={`button ${buttonStyle || ''}`}
      onClick={onClick}
    >
      {svgIcon ? (
        <span className='button__icon'>
          <SVGIcon />
        </span>
      ) : null}
      <p className='h4 button__title'>{children}</p>
    </button>
  );
}

export default Button;
