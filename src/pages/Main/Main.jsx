import React from 'react';
import SectionCarousel from '../../components/SectionCarousel/SectionCarousel';
import SectionDistance from '../../components/SectionDistance/SectionDistance';
import SectionTourlist from '../../components/SectionTourlist/SectionTourlist';

export default function Main() {
  return (
    <>
      <SectionCarousel />
      <SectionTourlist />
      <SectionDistance />
    </>
  );
}
