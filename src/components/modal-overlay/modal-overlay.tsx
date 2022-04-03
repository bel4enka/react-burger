import React from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay(props) {

  return (
      <div onClick={() => {props.onClose(false)}} className={styles.overlay}/>
  )
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}
export default ModalOverlay
