import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function LatestPurchasesComponent({ isOpen, onClose, latestPurchases }) {
  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header className='bg-myGreen font-title'><span className='text-myBeige'>Ultimi Acquisti</span></Modal.Header>
        <Modal.Body className='bg-myLightBeige'>
          <div className='space-y-6'>
            <ul>
              {latestPurchases.map((latestPurchase, index) => (
                <li className='text-center' key={index}>
                    {latestPurchase.name} - Prezzo: {latestPurchase.price}€ - Quantità: {latestPurchase.quantity}
                </li>
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
