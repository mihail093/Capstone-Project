import React from 'react';
import imageJumbothron from '../assets/photo-1497250681960-ef046c08a56e.avif';
import GrowingPlant from '../components/GrowingPlant';

export default function WelcomeComponent() {
  return (
    <section className='relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2)), url(${imageJumbothron})` }}>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative z-10 max-w-4xl mx-auto text-center text-white px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl sm:text-5xl font-dancingScript text-red-300 mb-6'>
          La Sughera 
        </h1>
        <h2 className='text-xl sm:text-5xl font-title mb-6'>Il Vostro Angolo di Verde</h2>

        {/*<p className='text-lg sm:text-xl mb-8'>
          Scoprite la bellezza e la serenità della natura, direttamente a casa vostra. Dalle rigogliose piante da interno alle splendide varietà da esterno, portiamo il vibrante mondo del verde sulla vostra soglia.
        </p>
        
        <p className='text-lg sm:text-xl mb-8'>
          Abbracciate la gioia di coltivare la vita, purificate il vostro spazio e arricchite il vostro ambiente con la nostra selezione accurata di piante.
        </p>*/}
        <GrowingPlant />
        
        <h2 className='text-2xl font-title sm:text-3xl font-bold mb-4'>
          Iniziate oggi il vostro viaggio verde
        </h2>
        
        <p className='text-2xl font-accent mb-8'>
          Perché ogni foglia racconta una storia, e ogni pianta ha una casa.
        </p>
      </div>
    </section>
  )
}