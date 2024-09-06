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
import UserDashboard from './pages/UserDashboard';
import ProtectedAdminRouteComponent from './components/ProtectedAdminRouteComponent';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const [categoryFromHome, setCategoryFromHome] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // useState per gestire 'Ultimi Acquisti' in Dashboard dell'utente
  const [latestPurchases, setLatestPurchases] = useState(() => {
    const savedLatestPurchases = localStorage.getItem('latestPurchases');
    return savedLatestPurchases ? JSON.parse(savedLatestPurchases) : [];
  });

  // useState per salvare id e nome pianta/prodotto (per la sezione preferiti)
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('latestPurchases', JSON.stringify(latestPurchases));
  }, [cartItems, favorites, latestPurchases]);

  const updateCart = (newItems) => {
    setCartItems(newItems);
  };

  return (
    <AuthProvider>
      <Flowbite theme={{ theme: customTheme }}>
        <div className="flex flex-col min-h-screen">
          <BrowserRouter>
            <NavComponent cartItems={cartItems} setCartItems={updateCart} setLatestPurchases={setLatestPurchases} />
            <Routes>
              <Route path='/' element={<Home setCategoryFromHome={setCategoryFromHome} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />                                   
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/backoffice' element={
                <ProtectedAdminRouteComponent>
                  <Backoffice />
                </ProtectedAdminRouteComponent>
              } />
              <Route 
                path='/pricing' 
                element={<PlantsAndProducts 
                  categoryFromHome={categoryFromHome} 
                  setCategoryFromHome={setCategoryFromHome} 
                  setCartItems={setCartItems}
                  setFavorites={setFavorites}
                />}
              />
              <Route path='/product/details/:id' element={<ProductDetails setCartItems={updateCart} setFavorites={setFavorites} favorites={favorites} />} />
              <Route path='/plant/details/:id' element={<PlantDetails setCartItems={updateCart} setFavorites={setFavorites} favorites={favorites} />} />
              <Route path='/user/settings' element={<UserSettings />} />
              <Route path='/user/dashboard' element={<UserDashboard favorites={favorites} latestPurchases={latestPurchases} />} />
            </Routes>
            <FooterComponent />
          </BrowserRouter>
        </div>
      </Flowbite>
    </AuthProvider>
  );
}

export default App;