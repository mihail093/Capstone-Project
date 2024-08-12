import React from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import logo from '../assets/LOGO.jpg';
import { Link } from 'react-router-dom';

export default function Register() {
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
            <div>
                <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Inserisci nuovamente la password" />
                </div>
                <TextInput id="repeat-password" type="password" placeholder="Inserisci la password" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Nome" />
                </div>
                <TextInput id="name" type="text" placeholder="Il tuo nome (facoltativo)" shadow />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="surname" value="Cognome" />
                </div>
                <TextInput id="surname" type="text" placeholder="Il tuo cognome (facoltativo)" shadow />
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="agree" />
                <Label htmlFor="agree" className="flex">
                    Accetto&nbsp;
                    <Link href="#" className="text-myGreen hover:underline dark:text-cyan-500">
                        termini e condizioni
                    </Link>
                </Label>
                <Checkbox id="age" />
                <Label htmlFor="age">Ho 18 anni o più</Label>
            </div>
            <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Registrati</Button>
        </form>
    </div>
  )
}
