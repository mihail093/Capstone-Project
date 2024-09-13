import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'flowbite-react';

export default function FavoritesComponent({ isOpen, onClose, userFavorites }) {

  const [itemTypes, setItemTypes] = useState({});

  useEffect(() => {
    // Questa funzione determina il tipo di item per ciascun preferito
    const determineItemTypes = () => {
      const types = {};
      userFavorites.forEach(favorite => {
        types[favorite.id] = favorite.type === 'plant' ? 'plant' : 'product';
      });
      setItemTypes(types);
    };

    determineItemTypes();
  }, [userFavorites]);

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header className='bg-myGreen font-title'><span className='text-myBeige'>Preferiti</span></Modal.Header>
        <Modal.Body className='bg-myLightBeige'>
          <div className='space-y-6'>
            <ul>
              {userFavorites.map((favorite) => (
                <Link to={`/${itemTypes[favorite.id]}/details/${favorite.id}`}>
                  <li className='text-center' key={favorite.id}>{favorite.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-myLightBeige'>
          <Button color='failure' onClick={onClose}>Chiudi</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}