import React from "react";
import styles from './app-header.module.css'


function AppHeader() {
    return (
        <>
            <h1>Это абзац шапки</h1>
            <div className={styles.abc}>Это абзац шапки</div>
            <div className={styles.test}>Второй</div>
        </>
    );
}

export default AppHeader;