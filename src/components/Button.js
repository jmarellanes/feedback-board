import { ReactComponent as ChevronLeft } from '../assets/images/chevron-left.svg';

function Button({ children, buttonStyle, svgIcon }) {
  return (
    <button className={`button ${buttonStyle || ''}`}>
      {svgIcon ? <ChevronLeft /> : null}
      <h4>{children}</h4>
    </button>
  );
}

export default Button;
