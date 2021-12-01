import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Work in Progress

const modalRoot = document.getElementById('modal');
const rootEl = modalRoot.nextElementSibling;

let firstFocusableElement;
let lastFocusableElement;

function initVariables() {
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = modalRoot.querySelectorAll(focusableElements);
  firstFocusableElement = modalRoot.querySelectorAll(focusableElements)[0];
  lastFocusableElement = focusableContent[focusableContent.length - 1];
}

function whenModalOpen() {
  rootEl.setAttribute('aria-hidden', true);
  rootEl.setAttribute('tabindex', '-1');
  firstFocusableElement.focus();
}

function whenModalClose() {
  rootEl.removeAttribute('aria-hidden');
  rootEl.removeAttribute('tabindex');
}

function handleFocus(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
  console.log(e.key);

  if (!isTabPressed) return;

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      e.preventDefault();
    }
  }
}

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) elRef.current = document.createElement('div');
  document.addEventListener('keydown', handleFocus);
  const focusedElBeforeOpen = document.activeElement;

  useEffect(() => {
    elRef.current.className = 'modal__wrapper';
    modalRoot.appendChild(elRef.current);

    initVariables();
    whenModalOpen();

    return () => {
      whenModalClose();
      modalRoot.removeChild(elRef.current);
      document.removeEventListener('keydown', handleFocus);
      focusedElBeforeOpen.focus();
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
