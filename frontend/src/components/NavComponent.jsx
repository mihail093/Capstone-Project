import React from 'react';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import logo from '../assets/LOGO.jpg';
import { Link } from 'react-router-dom';

export default function NavComponent() {
    return (
        <Navbar fluid className='bg-myGreen py-4'>
            <div className="flex items-center">
                <Navbar.Brand as={Link} to='/'>
                    <img 
                        src={logo} 
                        className='w-24 h-24 border-2 border-red-600' 
                        alt='La Sughera Logo' 
                    />
                </Navbar.Brand>
                <h1 className='text-3xl font-dancingScript text-red-500 ml-2 cursor-default'>
                    La Sughera
                </h1>
            </div>
            <div className='flex md:order-2'>
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                    <Avatar className='me-2' alt='User settings' rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>Bonnie Green</span>
                        <span className='block truncate text-sm font-medium'>name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/login">Accedi</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/register">Registrati</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to='/' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Home</Link>
                <Link to='/about' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Chi Siamo</Link>
                <Link to='/pricing' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Piante&Prodotti</Link>
                <Link to='/contact' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Contatti</Link>
                <Link to='/backoffice' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Back office</Link>
            </Navbar.Collapse>
        </Navbar>
    )
}