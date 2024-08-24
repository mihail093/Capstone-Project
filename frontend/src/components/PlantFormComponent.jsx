import React, { useState, useEffect } from 'react';
import { Button, Label, TextInput, Textarea, Radio } from "flowbite-react";

export default function PlantFormComponent({ setHabitat, onSubmit, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        scientificName: '',
        description: '',
        price: 0,
        careInstructions: {
            light: '',
            water: '',
            soil: '',
            temperature: '',
            difficulty: 'medium'
        },
        habitat: 'indoor',
        category: 'succulentiResistenti',
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
                    temperature: initialData.careInstructions?.temperature || '',
                    difficulty: initialData.careInstructions?.difficulty || 'medium',
                },
                habitat: initialData.habitat || 'indoor',
                category: initialData.category || 'succulentiResistenti',
                inStock: initialData.inStock || 0
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === 'file') {
            setImageFile(files[0]);
        } else if (type === 'radio') {
            if (name === 'careInstructions.difficulty') {
                setFormData(prev => ({
                    ...prev,
                    careInstructions: {
                        ...prev.careInstructions,
                        difficulty: value
                    }
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
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

    // Funzione per cambiare habitat indoor/outdoor
    const handleHabitatChange = () => {
        const newHabitat = formData.habitat === 'indoor' ? 'outdoor' : 'indoor';
        setFormData(prev => ({
            ...prev,
            habitat: newHabitat
        }));
        setHabitat(newHabitat);
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
                temperature: '',
                difficulty: 'medium'

            },
            habitat: 'indoor',
            category: 'succulentiResistenti',
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
                    className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-blue-50"
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
                <Textarea 
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
                <Textarea 
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
                <Textarea 
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
                <Textarea 
                    id="careInstructions.temperature" 
                    name="careInstructions.temperature"
                    value={formData.careInstructions.temperature}
                    onChange={handleChange} 
                    placeholder="Temperatura ottimale (facoltativo)" 
                    shadow 
                />
            </div>
            <div>
                <fieldset className="flex max-w-md gap-3">
                    <legend className="mb-4">Scegli la difficoltà nella cura della pianta</legend>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="difficulty-easiest" 
                            name="careInstructions.difficulty" 
                            value="easiest" 
                            checked={formData.careInstructions.difficulty === 'easiest'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="difficulty-easiest">Facilissimo</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="difficulty-easy" 
                            name="careInstructions.difficulty" 
                            value="easy" 
                            checked={formData.careInstructions.difficulty === 'easy'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="difficulty-easy">Facile</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="difficulty-medium" 
                            name="careInstructions.difficulty" 
                            value="medium" 
                            checked={formData.careInstructions.difficulty === 'medium'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="difficulty-medium">Medio</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="difficulty-difficult" 
                            name="careInstructions.difficulty" 
                            value="difficult" 
                            checked={formData.careInstructions.difficulty === 'difficult'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="difficulty-difficult">Difficile</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="difficulty-hardest" 
                            name="careInstructions.difficulty" 
                            value="hardest" 
                            checked={formData.careInstructions.difficulty === 'hardest'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="difficulty-hardest">Impegnativo</Label>
                    </div>
                </fieldset>
            </div>
            <div>
                <Label htmlFor="habitat" value="Habitat" />
                <TextInput 
                    id="habitat"
                    name='habitat'
                    value={formData.habitat}
                    onChange={handleChange}
                    disabled 
                    shadow 
                />
                <Button
                    color="primary"
                    className='mt-2' 
                    type="button" 
                    onClick={handleHabitatChange}>
                        Cambia habitat
                </Button>
            </div>
            <div>
                <fieldset className="flex max-w-md gap-3">
                    <legend className="mb-4">Scegli la categoria</legend>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="succulentiResistenti" 
                            name="category" 
                            value="succulentiResistenti" 
                            checked={formData.category === 'succulentiResistenti'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="succulentiResistenti">Succulenti e Resistenti</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="speciali" 
                            name="category" 
                            value="speciali" 
                            checked={formData.category === 'speciali'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="speciali">Speciali</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="utili" 
                            name="category" 
                            value="utili" 
                            checked={formData.category === 'utili'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="utili">Utili</Label>
                    </div>
                    <div className="flex items-center gap-1">
                        <Radio 
                            id="stagionaliPerenni" 
                            name="category" 
                            value="stagionaliPerenni" 
                            checked={formData.category === 'stagionaliPerenni'}
                            onChange={handleChange}
                        />
                        <Label htmlFor="stagionaliPerenni">Stagionali e Perenni</Label>
                    </div>
                </fieldset>
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
    )
}
