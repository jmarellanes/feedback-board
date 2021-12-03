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
    this.rootElement.setAttribute('aria-hidden', true);
    this.rootElement.setAttribute('tabindex', '-1');
    this.firstFocusableElement.focus();
  };

  whenModalClose = (element) => {
    this.rootElement.removeAttribute('aria-hidden');
    this.rootElement.removeAttribute('tabindex');

    this.modalElement.removeChild(element);
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
    document.removeEventListener('keydown', this.handleKeyDown);

    this.whenModalClose(this.modalRef.current);
  }

  render() {
    const { children } = this.props;

    if (!this.modalRef.current)
      this.modalRef.current = document.createElement('div');

    this.modalRef.current.className = 'modal__wrapper';
    this.modalElement.appendChild(this.modalRef.current);

    return createPortal(<>{children}</>, this.modalRef.current);
  }
}

export default Modal;
