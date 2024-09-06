import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function TermsAndConditionsComponent({ isOpen, onClose }) {

  return (
    <>
      <Modal show={isOpen} onClose={onClose}>
        <Modal.Header className='bg-myGreen font-title'><span className='text-myBeige'>Termini e condizioni</span></Modal.Header>
        <Modal.Body className='bg-myLightBeige'>
          <div className='space-y-6'>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              A meno di un mese dall'entrata in vigore delle nuove leggi sulla privacy dei consumatori dell'Unione Europea per
              i suoi cittadini, aziende in tutto il mondo stanno aggiornando i loro accordi sui termini di servizio per conformarsi.
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
            Il Regolamento Generale sulla Protezione dei Dati (GDPR) dell'Unione Europea entra in vigore il 25 maggio e ha lo scopo
            di garantire un insieme comune di diritti sui dati nell'Unione Europea. Richiede alle organizzazioni di notificare agli
            utenti, il prima possibile, le violazioni di dati ad alto rischio che potrebbero influenzarli personalmente.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-myLightBeige'>
          <Button color='primary' onClick={onClose}>Accetto</Button>
          <Button color='failure' onClick={onClose}>Rifiuto</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
