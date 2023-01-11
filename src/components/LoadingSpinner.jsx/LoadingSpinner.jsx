import React from 'react';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
  const delays = ['0', '0.1s', '0.3s', '0.4s', '0.5s'];
  return (
    <div className={styles.container}>
      {delays.map((el) => (
        <span className={styles.loader} key={el} style={{ animationDelay: `${el}` }}>
          ↓
        </span>
      ))}
    </div>
  );
}
