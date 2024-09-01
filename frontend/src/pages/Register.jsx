import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  // Estrae la funzione 'register' dal contesto di autenticazione
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Il nome utente deve avere almeno 3 caratteri";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email non valida";
    if (formData.password.length < 6) newErrors.password = "La password deve avere almeno 6 caratteri";
    if (formData.password !== formData.repeatPassword) newErrors.repeatPassword = "Le password non coincidono";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setApiError('');
    try {
      const { username, email, password } = formData;
      await register({ username, email, password });
      navigate('/login');
    } catch (error) {
      console.error('Errore nella registrazione', error);
      setApiError(error.response?.data?.message || 'Si è verificato un errore durante la registrazione');
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
            <Label className='text-white' htmlFor="username" value="Nome utente" />
            <TextInput 
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Inserisci un nome utente"
              required
              shadow 
              aria-invalid={!!errors.username}
              aria-describedby="username-error"
            />
            {errors.username && <p id="username-error" className="text-red-500">{errors.username}</p>}
          </div>
          <div>
            <Label className='text-white' htmlFor="email" value="Email" />
            <TextInput 
              id="email" 
              name="email" 
              type="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Inserisci l'email" 
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
              placeholder="Inserisci una password" 
              required 
              shadow 
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password && <p id="password-error" className="text-red-500">{errors.password}</p>}
          </div>
          <div>
            <Label className='text-white' htmlFor="repeatPassword" value="Conferma Password" />
            <TextInput 
              id="repeatPassword"
              name='repeatPassword'
              type="password"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Conferma la password" 
              required 
              shadow 
              aria-invalid={!!errors.repeatPassword}
              aria-describedby="repeatPassword-error"
            />
            {errors.repeatPassword && <p id="repeatPassword-error" className="text-red-500">{errors.repeatPassword}</p>}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-start gap-4 w-full">
            <div className="flex items-center gap-2">
              <Checkbox id="agree" required />
              <Label htmlFor="agree" className="flex text-white">
                Accetto&nbsp;
                <Link to="/termsAndConditions" className="text-white hover:underline">
                  termini e condizioni
                </Link>
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="age" required />
              <Label htmlFor="age" className="text-white">Ho 18 anni o più</Label>
            </div>
          </div>
          {apiError && <p className="text-red-500">{apiError}</p>}
          <Button color="primary" type="submit">Registrati</Button>
        </form>
      </div>
    </div>
  )
}