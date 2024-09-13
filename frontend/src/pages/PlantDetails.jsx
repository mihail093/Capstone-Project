import React, { useState, useEffect } from 'react';
import { Card, Alert, Button } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { plantApi } from '../services/api';
import { useAuth } from '../utils/AuthContext';
// Import di icone
import { FaTint, FaSeedling, FaSun } from 'react-icons/fa';
import { GiMedicalThermometer } from "react-icons/gi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { BsBagHeartFill } from "react-icons/bs";

import ImageViewerComponent from '../components/ImageViewerComponent';
import PlantCareIndicator from '../components/PlantCareIndicator';
import PlantCommentAreaComponent from '../components/PlantCommentAreaComponent';
import backgroundImageAvif from '../assets/photo-1540927550647-43699cb14916.avif';

export default function PlantDetails({ setCartItems, setFavorites, favorites }) {
    const { user } = useAuth();
    const [plant, setPlant] = useState(null);
    const { id } = useParams();
    // useState per gestire il colore dell'icona BsBagHeartFill
    const[isFavorite, setIsFavorite] = useState();
    //useState per ingrandire l'immagine
    const [zoomImage, setZoomImage] = useState(false);


    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                const response = await plantApi.getById(id);
                setPlant(response.data);
                // Controlla se la pianta è nei preferiti
                const isPlantFavorite = favorites.some(fav => fav.id === response.data._id);
                setIsFavorite(isPlantFavorite);
            } catch (error) {
                console.error('Errore nel recupero dei dettagli della pianta:', error);
            }
        };

        fetchPlantDetails();
    }, [id, favorites]);

    const toggleFavorite = (plant, user) => {
        setFavorites(prevFavorites => {
            const existingIndex = prevFavorites.findIndex(fav => fav.id === plant._id);
            
            if (existingIndex !== -1) {
                // Se è già nei preferiti, lo rimuoviamo
                setIsFavorite(false);
                return prevFavorites.filter((_, index) => index !== existingIndex);
            } else {
                // Se non è nei preferiti, lo aggiungiamo
                setIsFavorite(true);
                return [...prevFavorites, { userId: user._id, name: plant.name, id: plant._id, type: "plant" }];
            }
        });
    };

    if (!plant) {
        return (
            <Alert className='max-w-2xl mx-auto my-2 py-6' color="warning" rounded>
                Mi dispiace, i dettagli per questa pianta non sono disponibili
            </Alert>
        );
    }

    // Funzione per la gestione del carrello
    const manageCart = (item) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i.name === item.name);
            if (existingItemIndex > -1) {
                // Crea una copia profonda dell'array
                return prevItems.map((cartItem, index) => {
                    if (index === existingItemIndex) {
                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                    }
                    return cartItem;
                });
            } else {
                return [...prevItems, { name: item.name, price: item.price, quantity: 1 }];
            }
        });
    };

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
                        onClick={() => setZoomImage(true)} 
                    />
                    <ImageViewerComponent 
                        images={[plant.image]} 
                        isOpen={zoomImage} 
                        onClose={() => setZoomImage(false)} 
                    />
                    </div>
                    <p className="text-gray-700 text-center mb-4">
                        {plant.description}
                    </p>
                    <p className="text-center">Habitat: {plant.habitat}</p>
                    <p className="text-center">Categoria: {plant.category}</p>
                    <div className="flex justify-center items-center gap-4">
                        <h4 className="text-center text-gray-900 cursor-default">{plant.price} €</h4>
                        <BsBagHeartFill 
                            className={`text-2xl ${isFavorite ? 'text-myRed' : 'text-myGreen'} cursor-pointer`}
                            onClick={() => toggleFavorite(plant, user)}
                        />
                    </div>
                    <Button size='md' color="primary" className='m-auto mt-2' onClick={() => manageCart(plant)}>
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
                                <GiMedicalThermometer className='text-blue-200 text-[80px] mr-2'/>
                                <p className='font-sans text-lg'>{plant.careInstructions.temperature}</p>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className='text-xl sm:text-2xl font-title mb-3'>Acqua</h4>
                            <div className='flex items-center justify-center mb-2'>
                                <FaTint className='text-blue-500 text-[80px] mr-2'/>
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
                        <PlantCareIndicator plant={plant} />
                    </div>
                </div>
            </div>
            <PlantCommentAreaComponent plantId={id} />
        </div>
    );
}