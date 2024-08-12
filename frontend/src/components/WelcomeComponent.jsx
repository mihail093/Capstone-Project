import React from 'react';
import logo from '../assets/LOGO.jpg';

export default function WelcomeComponent() {
  return (
    <section className='text-myGreen py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
              <span className='font-dancingScript text-red-800'>La Sughera</span> Il Vostro Angolo di Verde
            </h1>
            <img src={logo} alt='Logo' className='w-1/4 h-1/4 mx-auto mb-8' />

            <p className='text-lg sm:text-xl mb-8'>
            Scoprite la bellezza e la serenità della natura, direttamente a casa vostra. Dalle rigogliose piante da interno alle splendide varietà da esterno, portiamo il vibrante mondo del verde sulla vostra soglia.
            </p>
            
            <p className='text-lg sm:text-xl mb-8'>
            Abbracciate la gioia di coltivare la vita, purificate il vostro spazio e arricchite il vostro ambiente con la nostra selezione accurata di piante.
            </p>
            
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
