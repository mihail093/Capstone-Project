import React from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen mx-auto py-16 text-center bg-cover bg-no-repeat'
         style={{ 
           backgroundImage: `url(${logo})`, 
           backgroundPosition: 'center 18%',
           backgroundSize: '114%' 
         }}>
      <div className="bg-myBeige bg-opacity-10 p-8 rounded-lg">
        <h1 className='text-4xl sm:text-5xl font-dancingScript text-red-500 mb-6'>
          La Sughera
        </h1>
        <form className="flex max-w-4xl flex-col justify-center items-center gap-4">
          <div>
            <Label className='text-white' htmlFor="email2" value="Email" />
            <TextInput id="email2" type="email" placeholder="Inserisci l'email" required shadow />
          </div>
          <div>
            <Label className='text-white' htmlFor="password2" value="Password" />
            <TextInput id="password2" type="password" placeholder="Inserisci la password" required shadow />
          </div>
          <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Accedi</Button>
        </form>
      </div>
    </div>
  )
}