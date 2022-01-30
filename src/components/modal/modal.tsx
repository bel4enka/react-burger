import React, {useEffect, useState} from 'react';
import styles from './modal.module.css'
import ReactDOM, {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal(props) {

  const node = document.getElementById('react-modals')!

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        props.onClose()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return createPortal(
    <>
      <ModalOverlay onClose={props.onClose}>
      <div className={`${styles.modal} pt-10 pl-10 pr-10 pb-15`}>
        <div >
          <div className={styles.modal__header}>
            {/*<h2 className={styles.modal__title}>{title}</h2>*/}
            <span onClick={() => {props.onClose(false)}} className={styles.modal__close}>
              <CloseIcon type='primary'/>
            </span>
          </div>
          <div>
            {props.children}
          </div>
        </div>
      </div>
      </ModalOverlay>
    </>,
      node
    );
}
export default Modal
