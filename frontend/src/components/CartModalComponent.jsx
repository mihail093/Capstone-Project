import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'flowbite-react';
import { HiOutlineTrash, HiMinus, HiPlus } from "react-icons/hi";
import { useAuth } from '../utils/AuthContext';

export default function CartModalComponent({ isOpen, onClose, cartItems, setCartItems }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCosts, setShippingCosts] = useState(0);

  const { user } = useAuth();

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const updateQuantity = (index, change) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index].quantity += change;
      
      // Rimuovi l'item se la quantità diventa 0 o inferiore
      if (newItems[index].quantity <= 0) {
        return newItems.filter((_, i) => i !== index);
      }
      
      return newItems;
    });
  };

  const removeItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingCosts = (subtotal < 50 && subtotal > 0) ? 4.99 : 0;
    const total = subtotal + shippingCosts;

    setSubtotal(subtotal);
    setShippingCosts(shippingCosts);
    setTotalPrice(total);
  };

  const proceedWithPurchase = () => {
    if (subtotal === 0) {
      alert('Il carrello è vuoto!')
    } else {
      onClose();
      setCartItems([]);
      alert('ACQUISTO AVVENUTO CON SUCCESSO');
    }
  }

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header className='bg-myGreen font-dancingScript'>
        <span className='text-3xl text-red-500'>La Sughera</span>
        <span className='ml-3 font-title text-lg text-myLightBeige'>se raggiungi 50 € la spedizione è gratuita</span>
      </Modal.Header>
      <Modal.Body className='bg-myLightBeige'>
        <div className="space-y-6">
          {cartItems.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2">
              <span className='m-auto'>{item.name}</span>
              <span className='m-auto'>{item.price.toFixed(2)} €</span>
              <div className="flex items-center m-auto">
                <Button size="xs" color="light" pill onClick={() => updateQuantity(index, -1)}><HiMinus /></Button>
                <span className="mx-2">{item.quantity}</span>
                <Button size="xs" color="light" pill onClick={() => updateQuantity(index, 1)}><HiPlus /></Button>
              </div>
              <HiOutlineTrash className='text-2xl m-auto hover:text-red-500' onClick={() => removeItem(index)} />
            </div>
          ))}
        </div>
        <div className="mt-10">
          {subtotal === 0  && <p className='font-title text-2xl text-center'>Il carrello è vuoto</p>}
          <p>Subtotale: {subtotal.toFixed(2)} €</p>
          {(shippingCosts > 0 && subtotal > 0) && <p>Spese di spedizione: {shippingCosts.toFixed(2)} €</p>}
          <p className="font-bold">Totale: {totalPrice.toFixed(2)} €</p>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-myLightBeige border-t-0'>
        {user ? (
          <Button color="primary" onClick={() => proceedWithPurchase()}>Procedi all'acquisto</Button>
        ) : (
          <Button color="primary" disabled>Per procedere all'acquisto Accedi/Registrati</Button>
        )}
        <Button color="failure" onClick={() => setCartItems([])}>Svuota Carrello</Button>
        <Button color="failure" onClick={onClose}>Chiudi</Button>
      </Modal.Footer>
    </Modal>
  );
}