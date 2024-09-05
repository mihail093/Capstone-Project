import React, { useState, useMemo } from 'react';
import { Avatar, Dropdown, Navbar, Button, Badge } from 'flowbite-react';
import logo from '../assets/LOGO.jpg';
import { Link, useNavigate } from 'react-router-dom';
import CartModalComponent from './CartModalComponent';
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { useAuth } from '../utils/AuthContext';

export default function NavComponent({ cartItems, setCartItems }) {
    // useState per gestire apertura/chiusura del Modal carrello
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Estraggo 'user' e 'logout' dal contesto di autenticazione
    const { user, logout } = useAuth();

    // useNavigate per reindirizzare l'utente alla pagina Home
    const navigate = useNavigate();

    // Calcola il numero totale di prodotti nel carrello
    const totalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const logoutFunction = () => {
        navigate('/');
        logout();
    }

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
            <div className='flex md:order-2 items-center'>
                <Button color="primary" onClick={() => setIsCartOpen(true)} className="mr-2">
                    <PiShoppingCartSimpleFill className='w-5 h-5 text-myBeige' />
                    <Badge color="failure" className="ml-2 bg-myBeige">{totalItems}</Badge>
                </Button>
                {user ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar 
                                img={user.avatar}
                                alt={`${user.username}'s avatar`}
                                rounded
                                className='me-2'
                            />
                        }
                    >
                        <Dropdown.Header className='text-sm cursor-default'>
                            <span className='block truncate font-medium'>{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item as={Link} to="/user/dashboard">Dashboard</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/user/settings">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutFunction}>Logout</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar 
                                alt='Default avatar'
                                rounded
                                className='me-2'
                            />
                        }
                    >
                        <Dropdown.Item as={Link} to="/login">Accedi</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/register">Registrati</Dropdown.Item>
                    </Dropdown>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link to='/' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Home</Link>
                <Link to='/about' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Chi Siamo</Link>
                <Link to='/pricing' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Piante&Prodotti</Link>
                <Link to='/contact' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Contatti</Link>
                {user && user.role === 'admin' && (
                    <Link to='/backoffice' className='text-myBeige hover:underline py-2 pl-3 pr-4 text-lg'>Back office</Link>
                )}
            </Navbar.Collapse>
            <CartModalComponent 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                setCartItems={setCartItems}
            />
        </Navbar>
    );
}