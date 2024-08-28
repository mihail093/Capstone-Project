import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import customTheme from './themes/customTheme';
import NavComponent from './components/NavComponent';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Backoffice from './pages/Backoffice';
import ProductDetails from './pages/ProductDetails';
import PlantDetails from './pages/PlantDetails';
import PlantsAndProducts from './pages/PlantsAndProducts';
import './App.css';

function App() {

  // useState che uso per salvare la categoria da 'Home' e passare il dato a 'PlantsAndProducts'
  const [categoryFromHome, setCategoryFromHome] = useState('');

  // useState che carica i dati del carrello dal localStorage all'avvio dell'app
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Aggiorna il localStorage ogni volta che cartItems cambia
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Funzione per aggiornare il carrello
  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <NavComponent cartItems={cartItems} setCartItems={updateCart}></NavComponent>
          <Routes>
            <Route path='/' element={<Home setCategoryFromHome={setCategoryFromHome} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/backoffice' element={<Backoffice />} />
            <Route 
              path='/pricing' 
              element={<PlantsAndProducts categoryFromHome={categoryFromHome} setCategoryFromHome={setCategoryFromHome} setCartItems={setCartItems} />} 
            />
            <Route path='/product/details/:id' element={<ProductDetails setCartItems={updateCart} />} />
            <Route path='/plant/details/:id' element={<PlantDetails setCartItems={updateCart} />} />
          </Routes>
          <FooterComponent></FooterComponent>
        </BrowserRouter>
      </div>
    </Flowbite>
  )
}

export default App
