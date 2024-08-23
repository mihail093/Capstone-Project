import React from 'react';
import './GrowingPlant.css';
import vaso from '../assets/OIP-removebg-preview.png';

const GrowingPlant = () => {
  return (
    <div className="plant-container">
        <img src={vaso} alt="vaso"  className="vase"/>
        <div className="stem">
            <div className="leaf leaf-1"></div>
            <div className="leaf leaf-2"></div>
            <div className="leaf leaf-3"></div>
        </div>
    </div>
  );
};

export default GrowingPlant;