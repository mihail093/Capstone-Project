import React, { useState } from 'react';
import { TextInput, Label, Button } from "flowbite-react";
import logo from '../assets/LOGO.jpg';
import { userApi } from '../services/api';
import { useAuth } from '../utils/AuthContext';

export default function UserSettingsComponent() {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        avatar: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        const formDataToSend = new FormData();
        formDataToSend.append('firstName', formData.firstName);
        formDataToSend.append('lastName', formData.lastName);
        if (formData.avatar) {
            formDataToSend.append('avatar', formData.avatar);
        }

        try {
            const response = await userApi.update(user._id, formDataToSend);
            setUser(response.data);
            setSuccess('Profilo aggiornato con successo!');
        } catch (err) {
            setError('Errore durante l\'aggiornamento del profilo. Riprova.');
            console.error('Errore:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center w-full h-screen mx-auto py-16 text-center bg-custom"
            style={{'--bg-image': `url(${logo})`}}
        >
            <div className="p-8 ml-[24px]">
                <h1 className='text-2xl sm:text-4xl font-dancingScript text-white'>Benvenuto</h1>
                <p className='text-2xl sm:text-4xl text-white'>{user.username}</p>
                <p className='text-md font-bold sm:text-lg text-white mt-8'>Puoi aggiungere il tuo nome completo e un'immagine di profilo</p>
                <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col justify-center items-center gap-4">
                    <div>
                        <Label className='text-white' htmlFor="firstName" value="Il tuo Nome" />
                        <TextInput 
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Inserisci il tuo nome"
                            shadow 
                        />
                    </div>
                    <div>
                        <Label className='text-white' htmlFor="lastName" value="Il tuo Cognome" />
                        <TextInput 
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Inserisci il tuo Cognome"
                            shadow 
                        />
                    </div>
                    <div>
                        <Label htmlFor="avatar" value="Immagine profilo" />
                        <input
                            id="avatar"
                            name="avatar"
                            type="file"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-900 border border-gray-500 rounded-lg cursor-pointer bg-blue-50"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Aggiornamento...' : 'Aggiorna Profilo'}
                    </Button>
                </form>
            </div>
        </div>
    );
}