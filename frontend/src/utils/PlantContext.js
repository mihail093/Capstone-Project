import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePlantReviews } from '../utils/usePlantReviews';
import { plantApi } from '../services/api';

const PlantContext = createContext();

export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
  const [topPlants, setTopPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getTopRatedPlantIds } = usePlantReviews();

  useEffect(() => {
    fetchTopPlants();
  }, []);

  const fetchTopPlants = async () => {
    setIsLoading(true);
    try {
      const topPlantIds = getTopRatedPlantIds(12);
      const plantDetails = await Promise.all(
        topPlantIds.map(id => plantApi.getPlantDetails(id))
      );
      setTopPlants(plantDetails.map(response => response.data));
    } catch (err) {
      console.error('Errore nel caricamento delle piante più votate:', err);
      setError('Si è verificato un errore nel caricamento delle piante più votate.');
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlantRating = (plantId, newRating) => {
    setTopPlants(prevPlants =>
      prevPlants.map(plant =>
        plant.id === plantId ? { ...plant, averageRating: newRating } : plant
      )
    );
    // Qui potresti anche aggiornare il localStorage se necessario
    localStorage.setItem(`plantReview_${plantId}`, newRating.toString());
  };

  return (
    <PlantContext.Provider value={{ topPlants, isLoading, error, updatePlantRating }}>
      {children}
    </PlantContext.Provider>
  );
};