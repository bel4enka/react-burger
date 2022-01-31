import React, {useEffect, useRef, useState} from 'react';
import styles from './modal-overlay.module.css'

function ModalOverlay(props) {
 const overlayRef = useRef(null)

  function closeModal(e) {
   if (e.target === overlayRef.current) {
    props.onClose(false)
   }
  }

  return(
      <div ref={overlayRef} onClick={closeModal} className={styles.overlay}/>
  )
}

export default ModalOverlay
