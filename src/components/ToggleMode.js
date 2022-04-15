import { useTheme } from '../context/ThemeContext';

import { ReactComponent as DarkMode } from '../assets/images/dark-mode.svg';

function ToggleMode() {
  const { themeIsDark, changeTheme } = useTheme();
  const [isDark] = themeIsDark;

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
          aria-labelledby='toggle-label'
          aria-checked={isDark}
          role='switch'
          className='toggle-button__button'
          onClick={changeTheme}
        >
          <span></span>
          <span id='toggle-label' hidden>
            Toggle Color Scheme
          </span>
        </button>
      </div>
    </div>
  );
}

export default ToggleMode;
