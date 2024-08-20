import React, { useState, useEffect } from 'react';
import { Card, Alert, Button } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { plantApi } from '../services/api';
// Import di icone
import { FaTint, FaSeedling, FaSun } from 'react-icons/fa';
import { GiMedicalThermometer } from "react-icons/gi";
import { MdOutlineZoomOutMap, MdZoomInMap } from "react-icons/md";

import PlantCareIndicator from '../components/PlantCareIndicator';
import backgroundImageAvif from '../assets/photo-1540927550647-43699cb14916.avif';

export default function PlantDetails() {
    const [plant, setPlant] = useState(null);
    const { id } = useParams();

    //useState per ingrandire l'immagine
    const [zoomImage, setZoomImage] = useState(false);

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
            
            <div className='flex justify-center mb-4'>
                <Card className="max-w-2xl" horizontal>
                    <div className="w-full h-48 overflow-hidden relative">
                        <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-full h-full object-contain"
                        />
                    <MdOutlineZoomOutMap 
                        className='absolute bottom-2 right-2 text-black text-[18px] cursor-pointer hover:text-[22px]' 
                        onClick={() => setZoomImage(true)} />
                    </div>
                    <p className="text-gray-700 dark:text-gray-400 text-center mb-4">
                        {plant.description}
                    </p>
                    <p className="text-center">Habitat: {plant.habitat}</p>
                    <h4 className="text-center text-gray-900 dark:text-white cursor-default">{plant.price} €</h4>
                    <Button size='md' className='m-auto bg-myGreen hover:!bg-myLightGreen mt-2'>
                    Aggiungi al carrello
                    </Button>
                </Card>
            </div>

            <div className='relative bg-cover bg-center p-8 rounded-lg shadow-lg overflow-hidden' 
                 style={{ backgroundImage: `url(${backgroundImageAvif})` }}>
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='relative z-10 text-white'>
                    <h3 className='text-2xl sm:text-3xl font-title font-bold mb-6 text-center'>Prenditi cura della tua pianta</h3>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Luce</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <FaSun className='text-yellow-400 text-[120px] mr-2' />
                                <p className='font-sans text-lg'>{plant.careInstructions.light}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Temperatura</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <GiMedicalThermometer className='text-blue-400 text-[80px] mr-2'/>
                                <p className='font-sans text-lg'>{plant.careInstructions.temperature}</p>
                            </div>
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
            {/*La parte sottostante per ingrandire l'immagine*/}
            {zoomImage && 
            <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center z-[1001]'>
                <MdZoomInMap className='text-red-500 hover:text-red-800 text-[40px] ' onClick={() => setZoomImage(false)} />
                <img className='max-w-[90%] max-h-[90%]' src={plant.image} alt={plant.name} />
            </div>}
        </div>
    );
}