// components/SpinnerOverlay.jsx
import React from 'react';
import styles from './overlay.module.css';

const SpinnerOverlay = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className={styles.SpinnerOverlay}>
            <div className={styles.Spinner}></div>
        </div>
    );
};

export default SpinnerOverlay;
