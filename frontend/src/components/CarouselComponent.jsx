import React from 'react';
import fiori from '../assets/fiori.png';

export default function CarouselComponent() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 mt-6'>
        <img className='max-w-[8em] mx-auto hover:scale-150 transition-all duration-280' src={fiori} alt='Fiori' />
        <img className='max-w-[8em] mx-auto hover:scale-150 transition-all duration-280' src={fiori} alt='Fiori' />
        <img className='max-w-[8em] mx-auto hover:scale-150 transition-all duration-280' src={fiori} alt='Fiori' />
        <img className='max-w-[8em] mx-auto hover:scale-150 transition-all duration-280' src={fiori} alt='Fiori' />
    </div>
  )
}