import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function FavoritesComponent({ isOpen, onClose, favorites }) {
  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header className='bg-myGreen font-title'><span className='text-myBeige'>Preferiti</span></Modal.Header>
        <Modal.Body className='bg-myLightBeige'>
          <div className='space-y-6'>
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite.id}>{favorite.name} {favorite.id}</li>
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