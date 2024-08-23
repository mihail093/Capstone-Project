import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import PlantFormComponent from '../components/PlantFormComponent';
import ProductFormComponent from '../components/ProductFormComponent';
import PlantListComponent from '../components/PlantListComponent';
import ProductListComponent from '../components/ProductListComponent';
import { productApi, plantApi } from '../services/api';

export default function Backoffice() {
    // useState per gestire l'input "habitat"
    const [habitat, setHabitat] = useState('indoor');

    // useState per gestire la difficoltà nella cura della pianta
    const [difficulty, setDifficulty] = useState('medium');

    const difficultyFunction = (difficulty) => {
        switch (difficulty) {
            case 'medium':
                return 'difficult';
            case 'difficult':
                return 'hardest';
            case 'hardest':
                return 'easiest';
            case 'easiest':
                return 'easy';
            case 'easy':
                return 'medium';
            default:
                return difficulty; 
        }
    }

    // useState per cambiare form e lista (form e lista PIANTE/ form e lista PRODOTTI)
    const [plantForm, setPlantForm] = useState(true);

    // useState per i PRODOTTI
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    // useState per le PIANTE
    const [plants, setPlants] = useState([]);
    const [editingPlant, setEditingPlant] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchPlants();
    }, []);

    // GET delle PIANTE
    const fetchPlants = async () => {
        try {
            const response = await plantApi.getAll();
            setPlants(response.data);
        } catch (error) {
            console.error('Errore nel recupero delle piante:', error);
        }
    };

    // GET dei PRODOTTI
    const fetchProducts = async () => {
        try {
            const response = await productApi.getAll();
            setProducts(response.data);
        } catch (error) {
            console.error('Errore nel recupero dei prodotti:', error);
        }
    };

    // handlePlantSubmit relativo alle PIANTE (POST e PUT)
    const handlePlantSubmit = async (plantData) => {
        try {
            let response;
            if (editingPlant) {
                console.log('Updating plant:', editingPlant._id);
                response = await plantApi.update(editingPlant._id, plantData);
            } else {
                console.log('Creating new plant');
                response = await plantApi.create(plantData);
            }
            console.log('Server response:', response);
            fetchPlants();
            setEditingPlant(null);
        } catch (error) {
            console.error('Error in handlePlantSubmit:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
        }
    };

    // handleProductSubmit relativo ai PRODOTTI (POST e PUT)
    const handleProductSubmit = async (productData) => {
        try {
            let response;
            if (editingProduct) {
                console.log('Updating product:', editingProduct._id);
                response = await productApi.update(editingProduct._id, productData);
            } else {
                console.log('Creating new product');
                response = await productApi.create(productData);
            }
            console.log('Server response:', response);
            fetchProducts();
            setEditingProduct(null);
        } catch (error) {
            console.error('Error in handleProductSubmit:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
        }
    };

    // handlePlantDelete relativo alle PIANTE (DELETE)
    const handlePlantDelete = async (id) => {
        try {
            await plantApi.delete(id);
            fetchPlants();
        } catch (error) {
            console.error('Errore nell\'eliminazione della pianta:', error);
        }
    }

    // handleProductDelete relativo ai PRODOTTI (DELETE)
    const handleProductDelete = async (id) => {
        try {
            await productApi.delete(id);
            fetchProducts();
        } catch (error) {
            console.error('Errore nell\'eliminazione del prodotto:', error);
        }
    };
    
    return (
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Backoffice
            </h1>
            <Button 
                color="primary"
                className='m-2' 
                onClick={() => setPlantForm(!plantForm)}>
                    {plantForm ? 'Gestisci Prodotti' : 'Gestisci Piante'}
            </Button>
            {plantForm ? (
                <>
                    <PlantListComponent
                        plants={plants}
                        onEdit={setEditingPlant}
                        onDelete={handlePlantDelete}
                    />
                    <PlantFormComponent 
                        habitat={habitat} 
                        setHabitat={setHabitat}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        difficultyFunction={difficultyFunction} 
                        onSubmit={handlePlantSubmit} 
                        initialData={editingPlant}
                    />
                </>
            ) : (
                <>
                    <ProductListComponent 
                        products={products}
                        onEdit={setEditingProduct}
                        onDelete={handleProductDelete}
                    />
                    <ProductFormComponent 
                        onSubmit={handleProductSubmit}
                        initialData={editingProduct}
                    />
                </>
            )}
        </div>
    )
}