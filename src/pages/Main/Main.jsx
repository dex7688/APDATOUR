import React from 'react';
import styles from './Main.module.css';
import SectionCarousel from '../../components/SectionCarousel/SectionCarousel';
import SectionTourlist from '../../components/SectionTourlist/SectionTourlist';
import SectionDistance from '../../components/SectionDistance/SectionDistance';

export default function Main() {
  return (
    <>
      <SectionCarousel />
      <SectionTourlist />
      <SectionDistance />
    </>
  );
}
