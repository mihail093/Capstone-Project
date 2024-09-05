import React, { useState, useEffect } from 'react';
import { Card, Alert, Button } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { productApi } from '../services/api';
import ProductCommentAreaComponent from '../components/ProductCommentAreaComponent';
import { BsBagHeartFill } from "react-icons/bs";

export default function ProductDetails({ setCartItems, setFavorites }) {
    // useState per salvarci i dati relativi al prodotto
    const [product, setProduct] = useState(null);
    // useParams per recuperare l'id del prodotto
    const { id } = useParams();

    // Funzione per aggiungere un nuovo preferito
    const addFavorite = (product) => {
        setFavorites(prevFavorites => {
            // Controlla se il prodotto è già nei preferiti
            const isAlreadyFavorite = prevFavorites.some(fav => fav.id === product._id);
            if (isAlreadyFavorite) {
                // Se è già nei preferiti, non fare nulla
                return prevFavorites;
            }
            // Altrimenti, aggiungi il nuovo preferito
            return [...prevFavorites, { name: product.name, id: product._id }];
        });
    };

    // useEffect mostra i dettagli del prodotto al montaggio e ogni volta che cambia l'id
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await productApi.getById(id);
                setProduct(response.data);
            } catch (error) {
                console.error('Errore nel recupero dei dettagli del prodotto:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Mostra un alert se non c'è il prodotto
    if (!product) {
        return <Alert className='max-w-2xl mx-auto my-2 py-6' color="warning" rounded>
                    Mi dispiace, i dettagli per questo prodotto non sono disponibili
                </Alert>;
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
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Il Vostro Angolo di Verde
            </h1>
            <h2 className='text-2xl sm:text-3xl font-title mb-6'>{product.name}</h2>
            <div className='flex justify-center'>
                <Card className="max-w-sm" horizontal>
                    <div className="w-full h-48 overflow-hidden">
                        <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-gray-700">
                        {product.description}
                    </p>
                    <p>Categoria: {product.category}</p>
                    <div className="flex justify-center items-center gap-4">
                        <h4 className="text-gray-900 cursor-default">{product.price} €</h4>
                        <BsBagHeartFill 
                            className='text-2xl text-myLightRed hover:text-red-600'
                            onClick={() => addFavorite(product)}
                        />
                    </div>
                    <Button size='md' color="primary" className='m-auto mt-2' onClick={() => manageCart(product)}>
                    Aggiungi al carrello
                    </Button>
                </Card>
            </div>
            <div className="text-left"><ProductCommentAreaComponent productId={id} /></div>
        </div>
    );
}