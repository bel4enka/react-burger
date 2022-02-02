import React, {useEffect, useRef, useState} from 'react';
import styles from './modal-overlay.module.css'
import PropTypes from "prop-types";
import Modal from "../modal/modal";

function ModalOverlay(props) {

  return(
      <div onClick={() => {props.onClose(false)}} className={styles.overlay}/>
  )
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
}
export default ModalOverlay
