import React from 'react';
import { Footer } from 'flowbite-react';

export default function FooterComponent() {
  return (
    <Footer container className='mt-auto bg-myGreen' style={{ borderRadius: 0 }}>
        <Footer.Copyright href='#' by='Flowbite™' year={2022} />
        <Footer.LinkGroup>
            <Footer.Link href='#'>About</Footer.Link>
            <Footer.Link href='#'>Privacy Policy</Footer.Link>
            <Footer.Link href='#'>Licensing</Footer.Link>
            <Footer.Link href='#'>Contact</Footer.Link>
        </Footer.LinkGroup>
    </Footer>
  )
}