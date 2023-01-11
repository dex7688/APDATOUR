import React from 'react';
import styles from './ItemCard.module.css';
import { Link } from 'react-router-dom';

export default function ItemCard({ title, firstimage, addr1, contentid }) {
  return (
    <Link to={`/detail/:${contentid}`} state={{ contentId: contentid }} className={styles.itemCard}>
      <img className={styles.itemImage} src={firstimage || 'images/gray.jpg'} alt={title} />
      <div className={styles.itemInfo}>
        <div className={styles.itemTitle}>{title}</div>
        <div className={styles.itemAddr}>{addr1}</div>
      </div>
    </Link>
  );
}
