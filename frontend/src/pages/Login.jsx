import React from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';

export default function Login() {
  return (
    <div className='max-w-4xl mx-auto py-16 text-center'>
        <h1 className='text-4xl sm:text-5xl font-title mb-6'>
              <span className='font-dancingScript text-red-800'>La Sughera</span> Il Vostro Angolo di Verde
        </h1>
        <img src={logo} alt='Logo' className='w-1/4 h-1/4 mx-auto mb-8' />
        <form className="flex max-w-4xl flex-col gap-4 px-8 py-6">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email2" value="Email" />
                </div>
                <TextInput id="email2" type="email" placeholder="Inserisci l'email" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="password2" value="Password" />
                </div>
                <TextInput id="password2" type="password" placeholder="Inserisci la password" required shadow />
            </div>
            <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Accedi</Button>
        </form>
    </div>
  )
}
