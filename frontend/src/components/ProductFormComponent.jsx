import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function ProductFormComponent({ onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: 'altriProdotti',
        inStock: 0
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                description: initialData.description || '',
                price: initialData.price || 0,
                inStock: initialData.inStock || 0
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = new FormData();
        
        for (const key in formData) {
            productData.append(key, formData[key]);
        }
        
        // Aggiungi l'immagine solo se è stata selezionata una nuova immagine
        if (imageFile) {
            productData.append('image', imageFile);
        }
        
        // Se stiamo aggiornando un prodotto esistente, aggiungi l'ID
        if (initialData && initialData._id) {
            productData.append('_id', initialData._id);
        }
        
        console.log('Submitting product data:');
        for (let [key, value] of productData.entries()) {
            console.log(key, value);
        }
        
        onSubmit(productData);
        
        // Reset del form dopo l'invio
        setFormData({
            name: '',
            description: '',
            price: 0,
            inStock: 0
        });
        setImageFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col gap-4 px-8 py-6">
            <div>
                <Label htmlFor="name" value="Nome" />
                <TextInput
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Inserisci il nome del prodotto"
                    required
                />
            </div>
            <div>
                <Label htmlFor="image" value="Immagine di copertina" />
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                {initialData && initialData.image && (
                    <img src={initialData.image} alt="Current product" className="mt-2 max-w-xs" />
                )}
            </div>
            <div>
                <Label htmlFor="description" value="Descrizione" />
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Inserisci una descrizione"
                    required
                />
            </div>
            <div>
                <Label htmlFor="price" value="Prezzo" />
                <TextInput
                    id="price"
                    name="price"
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Inserisci il prezzo"
                    required
                />
            </div>
            <div>
                <Label htmlFor="category" value="Categoria" />
                <TextInput
                    id="category"
                    name="category"
                    value={formData.category}
                    disabled
                />
            </div>
            <div>
                <Label htmlFor="inStock" value="In Stock" />
                <TextInput
                    id="inStock"
                    name="inStock"
                    type="number"
                    min={0}
                    value={formData.inStock}
                    onChange={handleChange}
                    placeholder="Inserisci la quantità disponibile"
                    required
                />
            </div>
            <Button color="primary" type="submit">
                {initialData ? 'Aggiorna' : 'Crea'}
            </Button>
        </form>
    );
}