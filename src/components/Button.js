import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';

function Button({ children, buttonStyle, svgIcon, typeAttribute, onClick }) {
  return (
    <button
      type={typeAttribute}
      className={`button ${buttonStyle || ''} form__button button__form`}
      onClick={onClick}
    >
      {svgIcon ? <ChevronLeft /> : null}
      <p className='h4'>{children}</p>
    </button>
  );
}

export default Button;
