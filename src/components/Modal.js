import React, { createRef } from 'react';
import { createPortal } from 'react-dom';

const modalElement = document.getElementById('modal');
const rootElement = modalElement.nextElementSibling;
let firstFocusableElement, lastFocusableElement, focusedElBeforeOpen;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef(null);

    this.initVariables = this.initVariables.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.whenModalOpen = this.whenModalOpen.bind(this);
    this.whenModalClose = this.whenModalClose.bind(this);
  }

  initVariables() {
    focusedElBeforeOpen = document.activeElement;

    const focusableElements =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent = modalElement.querySelectorAll(focusableElements);

    firstFocusableElement = modalElement.querySelectorAll(focusableElements)[0];
    lastFocusableElement = focusableContent[focusableContent.length - 1];
  }

  whenModalOpen() {
    rootElement.setAttribute('aria-hidden', true);
    rootElement.setAttribute('tabindex', '-1');
    firstFocusableElement.focus();
  }

  whenModalClose(element) {
    rootElement.removeAttribute('aria-hidden');
    rootElement.removeAttribute('tabindex');

    modalElement.removeChild(element);
    focusedElBeforeOpen.focus();
  }

  handleKeyDown(e) {
    let KEY_TAB = 'Tab';
    let KEY_ESC = 'Escape';

    switch (e.key) {
      case KEY_TAB:
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
        break;
      case KEY_ESC:
        this.props.onClose();
        break;
      default:
        break;
    }
  }

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
    modalElement.appendChild(this.modalRef.current);

    return createPortal(<>{children}</>, this.modalRef.current);
  }
}

export default Modal;
