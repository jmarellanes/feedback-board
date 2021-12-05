import React, { createRef } from 'react';
import { createPortal } from 'react-dom';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef(null);

    this.modalElement = document.getElementById('modal');
    this.rootElement = this.modalElement.nextElementSibling;
    this.firstFocusableElement = '';
    this.lastFocusableElement = '';
    this.focusedElBeforeOpen = '';
  }

  initVariables = () => {
    this.focusedElBeforeOpen = document.activeElement;

    this.focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusableContent = this.modalElement.querySelectorAll(
      this.focusableElements
    );

    this.firstFocusableElement = this.modalElement.querySelectorAll(
      this.focusableElements
    )[0];
    this.lastFocusableElement =
      this.focusableContent[this.focusableContent.length - 1];
  };

  whenModalOpen = () => {
    this.modalElement.className = `${this.modalElement.className} ${this.props.isOpen}`;

    this.rootElement.style.filter = 'blur(8px)';
    this.rootElement.setAttribute('aria-hidden', true);
    this.rootElement.setAttribute('tabindex', '-1');

    this.firstFocusableElement.focus();
  };

  whenModalClose = () => {
    this.modalElement.classList.remove('modal__is-open');

    this.rootElement.style.filter = null;
    this.rootElement.removeAttribute('aria-hidden');
    this.rootElement.removeAttribute('tabindex');

    this.focusedElBeforeOpen.focus();
  };

  handleKeyDown = (e) => {
    let KEY_TAB = 'Tab';
    let KEY_ESC = 'Escape';

    switch (e.key) {
      case KEY_TAB:
        if (e.shiftKey) {
          if (document.activeElement === this.firstFocusableElement) {
            this.lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === this.lastFocusableElement) {
            this.firstFocusableElement.focus();
            e.preventDefault();
          }
        }
        break;
      case KEY_ESC:
        this.props.onClose();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.initVariables();
    this.whenModalOpen();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    this.whenModalClose();

    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { children } = this.props;
    this.modalRef.current = this.modalElement;

    return createPortal(
      <div className='modal__wrapper'>{children}</div>,
      this.modalRef.current
    );
  }
}

export default Modal;
