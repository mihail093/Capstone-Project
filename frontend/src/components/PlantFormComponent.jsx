import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea } from "flowbite-react";

export default function PlantFormComponent({ habitat, setHabitat, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        scientificName: '',
        description: '',
        price: 0,
        careInstructions: {
            light: '',
            water: '',
            soil: '',
            temperature: ''
        },
        habitat: 'indoor',
        inStock: 0
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                scientificName: initialData.scientificName || '',
                description: initialData.description || '',
                price: initialData.price || 0,
                careInstructions: {
                    light: initialData.careInstructions?.light || '',
                    water: initialData.careInstructions?.water || '',
                    soil: initialData.careInstructions?.soil || '',
                    temperature: initialData.careInstructions?.temperature || ''
                },
                habitat: initialData.habitat || 'indoor',
                inStock: initialData.inStock || 0
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setImageFile(files[0]);
        } else if (name.startsWith('careInstructions.')) {
            const [, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                careInstructions: {
                    ...prev.careInstructions,
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const plantData = new FormData();
        
        for (const key in formData) {
            if (key === 'careInstructions') {
                for (const instructionKey in formData.careInstructions) {
                    plantData.append(`careInstructions.${instructionKey}`, formData.careInstructions[instructionKey]);
                }
            } else {
                plantData.append(key, formData[key]);
            }
        }
        
        if (imageFile) {
            plantData.append('image', imageFile);
        }
        
        if (initialData && initialData._id) {
            plantData.append('_id', initialData._id);
        }
        
        console.log('Submitting plant data:');
        for (let [key, value] of plantData.entries()) {
            console.log(key, value);
        }
        
        onSubmit(plantData);
        
        // Reset del form dopo l'invio
        setFormData({
            name: '',
            scientificName: '',
            description: '',
            price: 0,
            careInstructions: {
                light: '',
                water: '',
                soil: '',
                temperature: ''
            },
            habitat: 'indoor',
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
                    placeholder="Inserisci il nome della pianta" 
                    required 
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="scientificName" value="Nome scientifico" />
                <TextInput 
                    id="scientificName"
                    name="scientificName"
                    value={formData.scientificName}
                    onChange={handleChange}
                    placeholder="Inserisci il nome scientifico" 
                    required 
                    shadow />
            </div>
            <div>
                <Label htmlFor="image" value="Immagine di copertina" />
                <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
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
                    shadow 
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
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="careInstructions.light" value="Luce" />
                <TextInput 
                    id="careInstructions.light"
                    name="careInstructions.light"
                    value={formData.careInstructions.light}
                    onChange={handleChange}
                    placeholder="Luce ottimale" 
                    required 
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="careInstructions.water" value="Acqua" />
                <TextInput 
                    id="careInstructions.water" 
                    name="careInstructions.water"
                    value={formData.careInstructions.water}
                    onChange={handleChange} 
                    placeholder="Quanta acqua?" 
                    required 
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="careInstructions.soil" value="Terreno" />
                <TextInput 
                    id="careInstructions.soil" 
                    name="careInstructions.soil"
                    value={formData.careInstructions.soil}
                    onChange={handleChange} 
                    placeholder="Terreno ottimale (facoltativo)" 
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="careInstructions.temperature" value="Temperatura" />
                <TextInput 
                    id="careInstructions.temperature" 
                    name="careInstructions.temperature"
                    value={formData.careInstructions.temperature}
                    onChange={handleChange} 
                    placeholder="Temperatura ottimale (facoltativo)" 
                    shadow 
                />
            </div>
            <div>
                <Label htmlFor="habitat" value="Habitat" />
                <TextInput 
                    id="habitat"
                    name='habitat'
                    defaultValue={formData.habitat}
                    value={habitat}
                    disabled 
                    shadow 
                />
                <Button 
                    className='bg-myGreen hover:!bg-myLightGreen mt-2' 
                    type="button" 
                    onClick={() => setHabitat(habitat === 'indoor' ? 'outdoor' : 'indoor')}>
                        Cambia habitat
                </Button>
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
            <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">
                {initialData ? 'Aggiorna' : 'Crea'}
            </Button>
        </form>
    )
}
