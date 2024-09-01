import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import customTheme from './themes/customTheme';
import { AuthProvider } from './utils/AuthContext';
import NavComponent from './components/NavComponent';
import FooterComponent from './components/FooterComponent';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Backoffice from './pages/Backoffice';
import ProductDetails from './pages/ProductDetails';
import PlantDetails from './pages/PlantDetails';
import PlantsAndProducts from './pages/PlantsAndProducts';
import UserSettings from './pages/UserSettings';
import TermsAndConditionsComponent from './components/TermsAndConditionsComponent';
import './App.css';

function App() {
  const [categoryFromHome, setCategoryFromHome] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  return (
    <AuthProvider>  {/* Avvolgi l'intera app con AuthProvider */}
      <Flowbite theme={{ theme: customTheme }}>
        <div className="flex flex-col min-h-screen">
          <BrowserRouter>
            <NavComponent cartItems={cartItems} setCartItems={updateCart} />
            <Routes>
              <Route path='/' element={<Home setCategoryFromHome={setCategoryFromHome} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/backoffice' element={<Backoffice />} />
              <Route 
                path='/pricing' 
                element={<PlantsAndProducts 
                  categoryFromHome={categoryFromHome} 
                  setCategoryFromHome={setCategoryFromHome} 
                  setCartItems={setCartItems} 
                />} 
              />
              <Route path='/product/details/:id' element={<ProductDetails setCartItems={updateCart} />} />
              <Route path='/plant/details/:id' element={<PlantDetails setCartItems={updateCart} />} />
              <Route path='/user/settings' element={<UserSettings />} />
              <Route path='/termsAndConditions' element={<TermsAndConditionsComponent />} />
            </Routes>
            <FooterComponent />
          </BrowserRouter>
        </div>
      </Flowbite>
    </AuthProvider>
  );
}

export default App;