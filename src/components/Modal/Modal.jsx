import React, { useEffect, useRef } from 'react'
import './style.scss'
const Modal = ({children, closeModal, openModal}) => {
    const ref = useRef(null)
  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
       closeModal();
      }
    };
    document.addEventListener("mousedown", checkIfClickOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickOutside);
    };
  });
  return (
    openModal &&
   <div className="modal-wrapper">
    <div className="modal-content" ref={ref}>
    <button
            ref={ref}
            className="close-btn"
            onClick={closeModal}
            style={{ width: "4rem", height: "3rem" }}
          />
            {children}
    </div>
   </div>
  )
}

export default Modal