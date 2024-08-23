import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, TextInput, Dropdown } from 'flowbite-react';
import { productApi, plantApi } from '../services/api';

export default function PlantsAndProducts() {
    // useState per le PIANTE
    const [plants, setPlants] = useState([]);

    // useState per i PRODOTTI
    const [products, setProducts] = useState([]);

    // useState per selezionare la categoria
    const [categories, setCategories] = useState({
        indoor: false,
        outdoor: false,
        succulentiResistenti: false,
        speciali: false,
        utili: false,
        stagionaliPerenni: false,
        altriProdotti: false,
        all: true
    })

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

    // Funzione per gestire il click sulle categorie
    const handleCategoryClick = (category) => {
        setCategories(prevCategories => {
            const newCategories = Object.keys(prevCategories).reduce((acc, key) => {
                acc[key] = false;
                return acc;
            }, {});
            newCategories[category] = true;
            return newCategories;
        });
    };

    return (
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <div>
                <TextInput
                    placeholder="Cerca la pianta o il prodotto"
                />
                <Dropdown label="Scegli categoria">
                    <Dropdown.Item onClick={() => handleCategoryClick('indoor')}>Piante da Interno</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('outdoor')}>Piante da Esterno</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('succulentiResistenti')}>Piante Succulente e Resistenti</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('speciali')}>Piante Speciali</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('utili')}>Piante Utili</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('stagionaliPerenni')}>Piante Stagionali e Perenni</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('altriProdotti')}>Altri Prodotti</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleCategoryClick('all')}>Visualizza tutto</Dropdown.Item>
                </Dropdown>
            </div>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Backoffice
            </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {plants.map((plant) => (
                    (categories.all || (categories[plant.habitat] || categories[plant.category])) && (
                        <Card key={plant._id} className="h-full">
                            <Link to={`/plant/details/${plant._id}`} target="_blank" rel="noopener noreferrer" className="h-48 w-full overflow-hidden">
                                <img 
                                src={plant.image} 
                                alt={plant.name}
                                className="w-full h-full object-contain"
                                />
                            </Link>
                            <div className='p-4'>
                                <Link to={`/plant/details/${plant._id}`} target="_blank" rel="noopener noreferrer">
                                <h3 className="text-xl font-semibold hover:text-[1.3rem] hover:text-black tracking-tight text-gray-600">
                                    {plant.name}
                                </h3>
                                </Link>
                                <h4 className="text-black font-bold cursor-default">{plant.price} €</h4>
                                <Button size='md' color="primary" className='m-auto mt-2'>
                                Aggiungi al carrello
                                </Button>
                            </div>
                        </Card>
                    )
                ))}
                {products.map((product) => (
                    (categories.all || categories[product.category]) && (
                        <Card key={product._id} className="h-full">
                        <Link to={`/product/details/${product._id}`} target="_blank" rel="noopener noreferrer" className="h-48 w-full overflow-hidden">
                            <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                            />
                        </Link>
                        <div className='p-4'>
                            <Link to={`/product/details/${product._id}`} target="_blank" rel="noopener noreferrer">
                            <h3 className="text-xl font-semibold hover:text-[1.3rem] hover:text-black tracking-tight text-gray-600">
                                {product.name}
                            </h3>
                            </Link>
                            <h4 className="text-black font-bold cursor-default">{product.price} €</h4>
                            <Button size='md' color="primary" className='m-auto mt-2'>
                            Aggiungi al carrello
                            </Button>
                        </div>
                        </Card>
                    )
                ))}
            </div>
        </div>
    )
}
