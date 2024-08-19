import React, { useState, useEffect } from 'react';
import { Card, Alert, Button } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { plantApi } from '../services/api';
import { GiThermometerHot } from "react-icons/gi";
import { FaTint, FaSeedling } from 'react-icons/fa';
import PlantCareIndicator from '../components/PlantCareIndicator';
import backgroundImageAvif from '../assets/photo-1540927550647-43699cb14916.avif';

export default function PlantDetails() {
    const [plant, setPlant] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                const response = await plantApi.getById(id);
                setPlant(response.data);
            } catch (error) {
                console.error('Errore nel recupero dei dettagli della pianta:', error);
            }
        };

        fetchPlantDetails();
    }, [id]);

    if (!plant) {
        return (
            <Alert className='max-w-2xl mx-auto my-2 py-6' color="warning" rounded>
                Mi dispiace, i dettagli per questa pianta non sono disponibili
            </Alert>
        );
    }

    return (
        <div className='max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6 text-center'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Il Vostro Angolo di Verde
            </h1>
            <h2 className='text-2xl sm:text-3xl font-title mb-6 text-center'>{plant.name} - {plant.scientificName}</h2>
            
            <div className='flex justify-center mb-8'>
                <Card imgSrc={plant.image} horizontal className="max-w-2xl">
                    <p className="text-gray-700 dark:text-gray-400 mb-4">
                        {plant.description}
                    </p>
                    <p className="mb-4">Habitat: {plant.habitat}</p>
                    <Button size='sm' className='bg-myGreen hover:!bg-myLightGreen'>{plant.price} €</Button>
                </Card>
            </div>

            <div className='relative bg-cover bg-center p-8 rounded-lg shadow-lg overflow-hidden' 
                 style={{ backgroundImage: `url(${backgroundImageAvif})` }}>
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='relative z-10 text-white'>
                    <h3 className='text-2xl sm:text-3xl font-title font-bold mb-6 text-center'>Prenditi cura della tua pianta</h3>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Luce e Temperatura</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <GiThermometerHot className='text-yellow-400 text-[120px] mr-2' />
                                <p className='font-sans text-lg'>{plant.careInstructions.light}</p>
                            </div>
                            <p className='font-sans text-lg ml-[46px]'>{plant.careInstructions.temperature}</p>
                        </div>
                        
                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Acqua</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <FaTint className='text-blue-400 text-[80px] mr-2'/>
                                <p className='font-sans text-lg'>{plant.careInstructions.water}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Terreno</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <FaSeedling className='text-green-400 text-[120px] mr-3'/>
                                <p className='font-sans text-lg'>{plant.careInstructions.soil}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mt-6'>
                        <PlantCareIndicator />
                    </div>
                </div>
            </div>
        </div>
    );
}