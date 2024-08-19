import React from 'react';

export default function PlantCareIndicator() {

  return (
    <div className='mt-6'>
        <h4 className='text-lg font-semibold'>Difficoltà di cura</h4>
        <div className='w-full bg-myGreen rounded-full h-2.5 mt-2'>
            <div className='bg-myBeige h-2.5 rounded-full' style={{ width: '20%' }}>
            </div>
         </div>
    </div>
  )
}
