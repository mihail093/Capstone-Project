import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Dropdown } from 'flowbite-react';
import SearchBar from '../components/SearchBar';
import { productApi, plantApi } from '../services/api';

export default function PlantsAndProducts({ categoryFromHome, setCategoryFromHome, setCartItems }) {
    // useState per le PIANTE
    const [plants, setPlants] = useState([]);

    // useState per i PRODOTTI
    const [products, setProducts] = useState([]);

    // useState per la barra di ricerca
    const [searchTerm, setSearchTerm] = useState('');

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
    });

    useEffect(() => {
        fetchProducts();
        fetchPlants();
    }, []);

    useEffect(() => {
        if (categoryFromHome !== '') {
            setCategories(prevCategories => {
                const newCategories = Object.keys(prevCategories).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {});
                newCategories[categoryFromHome] = true;
                return newCategories;
            });
            setCategoryFromHome('');
        }
    }, [categoryFromHome, setCategoryFromHome]);


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

    // Funzione per la barra di ricerca
    const handleSearchChange = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    // Barra di ricerca (filtro i risultati)
    const filteredPlants = plants.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm) &&
        (categories.all || categories[plant.habitat] || categories[plant.category])
    );

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) &&
        (categories.all || categories[product.category])
    );

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
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <div>
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} placeholder="Cerca la pianta o il prodotto" />
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
                {filteredPlants.map((plant) => (
                    <Card key={plant._id} className="h-full">
                        <Link to={`/plant/details/${plant._id}`} className="h-48 w-full overflow-hidden">
                            <img 
                            src={plant.image} 
                            alt={plant.name}
                            className="w-full h-full object-contain"
                            />
                        </Link>
                        <div className='p-4'>
                            <Link to={`/plant/details/${plant._id}`}>
                                <h3 className="text-xl font-semibold hover:text-[1.3rem] hover:text-black tracking-tight text-gray-600">
                                    {plant.name}
                                </h3>
                            </Link>
                            <h4 className="text-black font-bold cursor-default">{plant.price} €</h4>
                            <Button size='md' color="primary" className='m-auto mt-2' onClick={() => manageCart(plant)}>
                                Aggiungi al carrello
                            </Button>
                        </div>
                    </Card>
                ))}
                {filteredProducts.map((product) => (
                    <Card key={product._id} className="h-full">
                        <Link to={`/product/details/${product._id}`} className="h-48 w-full overflow-hidden">
                            <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain"
                            />
                        </Link>
                        <div className='p-4'>
                            <Link to={`/product/details/${product._id}`}>
                                <h3 className="text-xl font-semibold hover:text-[1.3rem] hover:text-black tracking-tight text-gray-600">
                                    {product.name}
                                </h3>
                            </Link>
                            <h4 className="text-black font-bold cursor-default">{product.price} €</h4>
                            <Button size='md' color="primary" className='m-auto mt-2' onClick={() => manageCart(product)}>
                                Aggiungi al carrello
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
