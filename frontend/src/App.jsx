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

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex flex-col min-h-screen">
        <BrowserRouter>
          <NavComponent></NavComponent>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/backoffice' element={<Backoffice />} />
            <Route path='/pricing' element={<PlantsAndProducts />} />
            <Route path='/product/details/:id' element={<ProductDetails />} />
            <Route path='/plant/details/:id' element={<PlantDetails />} />
          </Routes>
          <FooterComponent></FooterComponent>
        </BrowserRouter>
      </div>
    </Flowbite>
  )
}

export default App
