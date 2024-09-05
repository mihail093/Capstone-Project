import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from 'flowbite-react';
import TermsAndConditionsComponent from './TermsAndConditionsComponent';

export default function FooterComponent() {
  // useState per gestire apertura/chiusura del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Footer container className='mt-auto bg-myGreen' style={{ borderRadius: 0 }}>
        <Link to='/' className='text-3xl font-dancingScript text-red-500'>La Sughera</Link>
        <Footer.LinkGroup>
            <Footer.Link as={Link} to='/about'>Chi Siamo</Footer.Link>
            <Footer.Link as={Link} to='/contact'>Contatti</Footer.Link>
            <Footer.Link className='cursor-pointer' onClick={() => setIsModalOpen(true)}>Termini e condizioni</Footer.Link>
        </Footer.LinkGroup>
        <TermsAndConditionsComponent
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        />
    </Footer>
  )
}