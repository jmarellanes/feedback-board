import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';
import { ReactComponent as Sign } from '../assets/images/plus-sign.svg';

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
      {svgIcon ? <SVGIcon /> : null}
      <p className='h4'>{children}</p>
    </button>
  );
}

export default Button;
