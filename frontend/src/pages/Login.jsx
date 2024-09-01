import React, { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  // Estrae la funzione 'login' dal contesto di autenticazione
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email non valida";
    if (!formData.password) newErrors.password = "La password è obbligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setApiError('');
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Errore nel login', error);
      setApiError(error.response?.data?.message || 'Si è verificato un errore durante il login');
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen mx-auto py-16 text-center bg-custom"
      style={{
        '--bg-image': `url(${logo})`,
      }}
    >
      <div className="bg-myBeige bg-opacity-10 p-8 rounded-lg ml-[24px]">
        <h1 className='text-4xl sm:text-5xl font-dancingScript text-red-500 mb-6'>
          La Sughera
        </h1>
        <form onSubmit={handleSubmit} className="flex max-w-4xl flex-col justify-center items-center gap-4">
          <div>
            <Label className='text-white' htmlFor="email" value="Email" />
            <TextInput 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email" 
              required 
              shadow 
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Label className='text-white' htmlFor="password" value="Password" />
            <TextInput 
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Inserisci la tua password" 
              required 
              shadow 
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="text-red-500">{errors.password}</p>}
          </div>
          {apiError && <p className="text-red-500">{apiError}</p>}
          <Button color="primary" type="submit">Accedi</Button>
          <p className="text-white">
            Non hai un account? <Link to="/register" className="text-blue-300 hover:underline">Registrati</Link>
          </p>
        </form>
      </div>
    </div>
  );
}