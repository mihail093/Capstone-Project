import React from 'react';
import { Button, Label, TextInput } from "flowbite-react";

export default function ProductFormComponent() {

    return (
        <form className="flex max-w-4xl flex-col gap-4 px-8 py-6">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Nome" />
                </div>
                <TextInput id="name" type="text" placeholder="Inserisci il nome del prodotto" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="image" value="Immagine di copertina" />
                </div>
                <TextInput id="image" type="text" placeholder="Inserisci un'immagine di copertina" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="description" value="Descrizione" />
                </div>
                <TextInput id="description" type="text" placeholder="Inserisci una descrizione" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="price" value="Prezzo" />
                </div>
                <TextInput id="price" type="number" placeholder="Inserisci il prezzo" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="category" value="Categoria" />
                </div>
                <TextInput id="category" type="text" placeholder="Inserisci la categoria" required shadow />
            </div>
            <div>
                <div className="mb-2 block">
                <Label htmlFor="inStock" value="In Stock" />
                </div>
                <TextInput id="inStock" type="number" min={0} shadow />
            </div>
            <Button className='bg-myGreen hover:!bg-myLightGreen' type="submit">Crea</Button>
        </form>
    )
}