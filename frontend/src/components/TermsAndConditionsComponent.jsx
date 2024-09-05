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
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              The European Union's General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className='bg-myLightBeige'>
          <Button color='primary' onClick={onClose}>I accept</Button>
          <Button color='failure' onClick={onClose}>Decline</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
