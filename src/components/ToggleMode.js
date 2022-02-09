import { useState } from 'react';

import { ReactComponent as DarkMode } from '../assets/images/dark-mode.svg';

function ToggleMode() {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='header-main__toggle toggle-button'>
      <div className='toggle-button__container-icon'>
        <DarkMode />
        <p className='toggle-button__title'>Dark Mode</p>
      </div>
      <div className='toggle-button__container-button'>
        <button
          type='button'
          data-action='aria-switch'
          aria-labelledby='toggle_label'
          aria-checked={isChecked}
          role='switch'
          className='toggle-button__button'
          onClick={handleClick}
        >
          <span></span>
        </button>
      </div>
    </div>
  );
}

export default ToggleMode;
