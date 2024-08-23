import React, { useState, useEffect } from 'react';

export default function PlantCareIndicator({ plant }) {
  // Stato per la classe di larghezza e colore
  const [difficultyClass, setDifficultyClass] = useState('w-1/2 bg-blue-600');

  // Funzione che controlla la difficoltà e imposta la classe
  const indicatorFunction = (plant) => {
    const difficultyInCare = plant.careInstructions.difficulty;
    switch(difficultyInCare) {
      case 'easiest':
        setDifficultyClass('w-[3%] bg-green-300');
        break;
      case 'easy':
        setDifficultyClass('w-1/4 bg-green-600');
        break;
      case 'medium':
        setDifficultyClass('w-1/2 bg-blue-600');
        break;
      case 'difficult':
        setDifficultyClass('w-3/4 bg-red-600');
        break;
      case 'hardest':
        setDifficultyClass('w-[97%] bg-red-800');
        break;
      default:
        setDifficultyClass('w-1/2 bg-blue-600');
    }
  }

  useEffect(() => {
    indicatorFunction(plant);
  }, [plant]);

  return (
    <div className='mt-6'>
      <h4 className='text-lg font-semibold'>Difficoltà di cura</h4>
      <div className='w-full bg-myGreen rounded-full h-2.5 mt-2'>
        <div className={`h-2.5 rounded-full ${difficultyClass}`}></div>
      </div>
    </div>
  )
}