import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
  const elRef = useRef(null);

  if (!elRef.current) elRef.current = document.createElement('div');

  useEffect(() => {
    elRef.current.className = 'modal__wrapper';
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};

export default Modal;
