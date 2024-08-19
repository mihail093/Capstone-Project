import React from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';
import { Link } from 'react-router-dom';

export default function Register() {
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
          <div>
            <Label className='text-white' htmlFor="repeat-password" value="Conferma Password" />
            <TextInput id="repeat-password" type="password" placeholder="Conferma la password" required shadow />
          </div>
          <div>
            <Label className='text-white' htmlFor="name" value="Nome" />
            <TextInput id="name" type="text" placeholder="Il tuo nome (facoltativo)" shadow />
          </div>
          <div>
            <Label className='text-white' htmlFor="surname" value="Cognome" />
            <TextInput id="surname" type="text" placeholder="Il tuo cognome (facoltativo)" shadow />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-start gap-4 w-full">
            <div className="flex items-center gap-2">
              <Checkbox id="agree" />
              <Label htmlFor="agree" className="flex text-white">
                Accetto&nbsp;
                <Link to="#" className="text-white hover:underline dark:text-cyan-500">
                  termini e condizioni
                </Link>
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="age" />
              <Label htmlFor="age" className="text-white">Ho 18 anni o più</Label>
            </div>
          </div>
          <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Registrati</Button>
        </form>
      </div>
    </div>
  )
}