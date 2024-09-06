import React, { useState } from 'react';
import logo from '../assets/LOGO.jpg';
import { Avatar } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import FavoritesComponent from '../components/FavoritesComponent';
import LatestPurchasesComponent from '../components/LatestPurchasesComponent';

export default function UserDashboard({ favorites, latestPurchases }) {
    // Estraggo 'user' e 'logout' dal contesto di autenticazione
    const { user, logout } = useAuth();

    // useState per gestire apertura/chiusura del Modal
    const [isModalFavoritesOpen, setIsModalFavoritesOpen] = useState(false);

    // useState per gestire apertura/chiusura del Modal
    const [isModalPurchasesOpen, setIsModalPurchasesOpen] = useState(false);

    // useNavigate per reindirizzare l'utente alla pagina Home
    const navigate = useNavigate();

    const logoutFunction = () => {
        navigate('/');
        logout();
    }

  return (
    <div className="flex flex-col justify-certer items-center w-full h-screen mx-auto py-16 text-center bg-custom"
        style={{'--bg-image': `url(${logo})`}}
    >
        <div>
            <h1 className='text-2xl sm:text-4xl font-dancingScript text-white mb-4'>Benvenuto {user.username}</h1>
            <Avatar img={user.avatar} size="xl" rounded bordered color="success" />
            <p className='text-base sm:text-xl text-white'>{user.firstName} {user.lastName} </p>
            
            <div className='rounded-full text-xl text-myBeige p-2 mt-6'>
                <div 
                    className='rounded-full mb-2 py-2 px-2 bg-black cursor-pointer hover:bg-myLightBeige hover:text-black' 
                    onClick={() => {setIsModalFavoritesOpen(true)}}
                >
                    Preferiti
                </div>
                <div 
                    className='rounded-full mb-2 py-2 px-2 bg-black cursor-pointer hover:bg-myLightBeige hover:text-black'
                    onClick={() => {setIsModalPurchasesOpen(true)}}
                >
                    Ultimi Acquisti

                </div>
                <div className='mt-6 bg-black cursor-pointer hover:bg-myBeige hover:text-black' onClick={() => logoutFunction()}>Logout</div>
            </div>
        </div>
        <FavoritesComponent 
            isOpen={isModalFavoritesOpen} 
            onClose={() => setIsModalFavoritesOpen(false)}
            favorites={favorites}
        />
        <LatestPurchasesComponent
            isOpen={isModalPurchasesOpen} 
            onClose={() => setIsModalPurchasesOpen(false)}
            latestPurchases={latestPurchases}
        />
    </div>
  )
}
