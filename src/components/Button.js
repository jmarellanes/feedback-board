import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';

function Button({ children, buttonStyle, svgIcon, typeAttribute }) {
  return (
    <button
      type={typeAttribute}
      className={`button ${buttonStyle || ''} form__button button__form`}
    >
      {svgIcon ? <ChevronLeft /> : null}
      <p className='h4'>{children}</p>
    </button>
  );
}

export default Button;
