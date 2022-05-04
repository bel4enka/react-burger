import React, {FC} from 'react';
import styles from './modal-overlay.module.css'

type TModalOverlayProps = {
  readonly onClose: (a:boolean) => void;
}
const ModalOverlay = ( { ...props }:TModalOverlayProps ) => {

  return (
      <div onClick={() => {props.onClose(false)}} className={styles.overlay}/>
  )
}

export default ModalOverlay
