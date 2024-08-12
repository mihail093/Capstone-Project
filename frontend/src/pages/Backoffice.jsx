import React from 'react';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import PlantFormComponent from '../components/PlantFormComponent';
import ProductFormComponent from '../components/ProductFormComponent';

export default function Backoffice() {
    // useState per inserimento del dato relativo all'habitat della pianta
    const [habitat, setHabitat] = useState('indoor');

    //useState per cambiare il tipo di form: form per le piante/form per i prodotti
    const [plantForm, setPlantForm] = useState(true);
    
    return (
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Il Vostro Angolo di Verde
            </h1>
            <h3 className='text-xl sm:text-2xl font-title mb-3 flex'>
                Vuoi aggiungere
                <Button 
                    className='mx-3 bg-myGreen hover:!bg-myLightGreen' 
                    type="button"
                    onClick={() => setPlantForm(true)}>
                        Una Pianta
                </Button> 
                o 
                <Button 
                    className='mx-3 bg-myGreen hover:!bg-myLightGreen' 
                    type="button"
                    onClick={() => setPlantForm(false)}>
                        Un Prodotto
                </Button>
                ?
            </h3>
            {plantForm && <PlantFormComponent habitat={habitat} setHabitat={setHabitat} />}
            {!plantForm && <ProductFormComponent />}
        </div>
    )
}
