import React, { useState, useEffect } from 'react';
import { Card } from "flowbite-react";
import { useParams } from 'react-router-dom';
import { productApi } from '../services/api';

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();

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

    if (!product) {
        return <div>Caricamento...</div>;
    }

    return (
        <div className='max-w-4xl mx-auto py-16 text-center'>
            <h1 className='text-4xl sm:text-5xl font-title mb-6'>
                <span className='font-dancingScript text-red-800'>La Sughera</span> Backoffice
            </h1>
            <h2 className='text-2xl sm:text-3xl font-title mb-6'>{product.name}</h2>
            <Card className="max-w-sm" imgSrc={product.image} horizontal>
                <p className="text-gray-700 dark:text-gray-400">
                    {product.description}
                </p>
            </Card>
            <p>Prezzo: {product.price}</p>
            <p>Categoria: {product.category}</p>
        </div>
    );
}